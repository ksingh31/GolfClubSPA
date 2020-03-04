import { Component, ViewChild } from '@angular/core';
import { recurrenceData } from '../data';
import { createElement, extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ScheduleComponent, EventSettingsModel, EventRenderedArgs,
  View, DayService, WeekService, MonthService, ResizeService, ActionEventArgs, DragAndDropService,
  PopupOpenEventArgs, 
  WorkHoursModel} from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
// import { ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { ReservationsService } from '../_services/reservations.service';
import { Reservation } from '../_models/reservation';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { TeeTime } from '../_models/teeTime';

@Component({
    selector: 'app-control-content',
    templateUrl: './recurrence.component.html',
    providers: [DayService, WeekService, MonthService, ResizeService, DragAndDropService],
    styleUrls: ['./recurrence.component.css']
})
export class RecurrenceComponent {
  teeTime: Reservation[];
  empList: Array<{Id: Number, Subject: string, StartTime: Date, EndDate: Date,
  RecurrenceRule: string, CategoryColor: string}> = [];
  public data;
    public selectedDate: Date;
    reservationData: Reservation;
    public eventSettings: EventSettingsModel = {
      dataSource: this.data,
      fields: {
        id: 'Id',
        subject: null,
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } },
      },
    };
    public currentView: View = 'Week';
    @ViewChild('scheduleObj', { static: true })
    public scheduleObj: ScheduleComponent;
    public AllowInline: boolean;

    constructor(private reserv: ReservationsService, public authService: AuthService, public alertify: AlertifyService) {
      this.selectedDate = new Date();
      //this.loadData();
      this.reserv.getteeTimes()
      .subscribe((teeTime: Reservation[]) => {
          this.teeTime = teeTime;
        for (let i = 0; i < this.teeTime.length; i++) {
            this.empList.push(
            {
              Id: teeTime[i].id,
              Subject: teeTime[i].subject,
              StartTime: teeTime[i].startDate,
              EndDate: teeTime[i].endDate,
              RecurrenceRule: teeTime[i].recurringData,
              CategoryColor: '#1aaa55'
          });
        }
        this.data = extend([], this.empList, null, true) as object[];
        console.log(this.data);
      }, error => {
        this.alertify.error(error);
      });
    }

    ngOnInit() {
      // this.loadData();
      // this.data = extend([], this.teeTime, null, true) as object[];
      // this.eventSettings.dataSource = this.teeTime;
    }

    public onPopupOpen(args: PopupOpenEventArgs): void {
      if(args.target.classList.contains('e-appointment') !== undefined) {
        if (args.target.classList.contains('e-appointment')) {
            args.cancel = this.onEventCheck(args);
        }
      }
      args.duration = 60;
      const dialogObj = (args.element as any).ej2_instances[0];
      dialogObj.open = () => {
        // Changed the event duration to 60 min
        const startObj = (args.element.querySelector('.e-start') as any)
          .ej2_instances[0];
        startObj.step = 60;
        const endObj = (args.element.querySelector('.e-end') as any)
          .ej2_instances[0];
        endObj.step = 60;
      };

      if (args.type === 'Editor') {
        if (localStorage.getItem('role') === 'User') {
          (this.scheduleObj.eventWindow as any).recurrenceEditor.frequencies = ['none'];
        } else {
          (this.scheduleObj.eventWindow as any).recurrenceEditor.frequencies = ['none', 'weekly'];
        }
        if (!args.element.querySelector('.custom-field-row')) {
          if (localStorage.getItem('role') === 'Admin') {
            const row: HTMLElement = createElement('div', { className: 'custom-field-row' });
            const formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
            formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
            const container: HTMLElement = createElement('div', { className: 'custom-field-container' });
            const inputEle: HTMLInputElement = createElement('input', {
                className: 'e-field', attrs: { name: 'approvalInput' }
            }) as HTMLInputElement;
            container.appendChild(inputEle);
            row.appendChild(container);
            const drowDownList: DropDownList = new DropDownList({
                dataSource: [
                    { text: 'Not Approved', value: '0'},
                    { text: 'Approved', value: '1' }
                ],
                fields: { text: 'text', value: 'value' },
                value: '0',
                floatLabelType: 'Always', placeholder: 'Event Type'
            });
            drowDownList.appendTo(inputEle);
            inputEle.setAttribute('name', 'approvalInput');
          }
          const row: HTMLElement = createElement('div', { className: 'custom-field-row' });
          const formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
          formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
          const container: HTMLElement = createElement('div', { className: 'noofPlayer-field-container' });
          const inputEle: HTMLInputElement = createElement('input', {
              className: 'e-field', attrs: { name: 'noOfPlayerInput' }
          }) as HTMLInputElement;
          container.appendChild(inputEle);
          row.appendChild(container);
          const drowDownList: DropDownList = new DropDownList({
              dataSource: [
                  { text: 'One', value: '1'},
                  { text: 'Two', value: '2' },
                  { text: 'Three', value: '3'},
                  { text: 'Four', value: '4' }
              ],
              fields: { text: 'text', value: 'value' },
              value: '4',
              floatLabelType: 'Always', placeholder: 'Number of Players'
          });
          drowDownList.appendTo(inputEle);
          inputEle.setAttribute('name', 'noOfPlayerInput');
        }
      }
    }

    oneventRendered(args: EventRenderedArgs): void {
        const categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }

    public onActionBegin(args: ActionEventArgs): void {
      if ((args.requestType === 'eventCreate') || args.requestType === 'eventChange') {
        args.cancel = this.onEventCheck(args);
        // console.log(args.cancel);
      }
        // if (args.requestType === 'eventChange') {
        //     console.log(args);
        // }
        // if (args.requestType === 'eventCreate') {
        //     console.log('event create');
        // }
    }
    public onEventCheck(args: any): any {
        const eventObj: any = args.data instanceof Array ? args.data[0] : args.data;
        // console.log(eventObj);
        this.reservationData = {
          id: this.authService.decodedToken.nameid,
          subject: eventObj.Subject,
          startDate: eventObj.StartTime,
          endDate: eventObj.EndTime,
          reservationType: eventObj.RecurrenceRule !== undefined ? 2 : 1,
          recurringData: eventObj.RecurrenceRule !== undefined ? eventObj.RecurrenceRule : null,
          noOfPlayers: eventObj.noOfPlayerInput,
          approval: eventObj.approvalInput
        };
        // console.log(this.reservationData);
        if (args.requestType === 'eventCreate') {
          this.reserv.AddReservation(this.reservationData).subscribe(next => {
            this.alertify.success('Inserted successfully');
          }, error => {
            this.alertify.error(error);
          });
          // console.log(this.reservationData);
        }

        else {
          if (args.requestType === 'eventChange') {
            console.log(args.requestType);
          }
        }
    }

    onActionComplete(args): void {
      if ( args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
        const currentViewDates = this.scheduleObj.getCurrentViewDates();
        const startDate = currentViewDates[0];
        const endDate = currentViewDates[currentViewDates.length - 1];
        // console.log(startDate);
        // console.log(endDate);
      }
    }
    // onChange(args: ChangeEventArgs): void {
    //   this.scheduleObj.eventSettings.editFollowingEvents = args.checked;
    // }

    // add(): void {
    //   console.log('add');
    // }
    // edit(): void {
    //   console.log('edit');
    // }
    // delete(): void {
    //   console.log('delete');
    // }
}
