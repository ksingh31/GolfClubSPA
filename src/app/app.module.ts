import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { RecurrenceComponent } from './recurrence/recurrence.component';
import { ScheduleComponent, EventSettingsModel, EventRenderedArgs,
   View, DayService, WeekService, MonthService, ResizeService, DragAndDropService,
   WorkWeekService, MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { ReservationsComponent } from './reservations/reservations.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
export function tokenGetter() {
   return localStorage.getItem('token');
}

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent,
      RecurrenceComponent,
      ReservationsComponent,
      DialogboxComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MatTableModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      RouterModule.forRoot(appRoutes),
      //ScheduleAllModule,
      RecurrenceEditorAllModule,
      NumericTextBoxAllModule,
      //DatePickerAllModule,
      TimePickerAllModule,
      DateTimePickerAllModule,
      CheckBoxAllModule,
      //ToolbarAllModule,
      DropDownListAllModule,
      ContextMenuAllModule,
      MaskedTextBoxModule,
      //UploaderAllModule,
      MultiSelectAllModule,
      TreeViewModule,
      ButtonAllModule,
      BrowserModule,
      CommonModule,
      ScheduleAllModule,
      RecurrenceEditorAllModule,
      NumericTextBoxAllModule,
      DatePickerAllModule,
      TimePickerAllModule,
      DateTimePickerAllModule,
      CheckBoxAllModule,
      ToolbarAllModule,
      DropDownListAllModule,
      ContextMenuAllModule,
      MaskedTextBoxModule,
      UploaderAllModule,
      MultiSelectAllModule,
      TreeViewModule,
      ButtonAllModule,
      UploaderAllModule,
      MultiSelectAllModule,
      TreeViewModule,
      ButtonAllModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
   ],
   entryComponents: [
      DialogboxComponent
    ],
   providers: [
      AuthService,
      AlertifyService,
      DayService,
      WeekService,
      WorkWeekService,
      MonthService,
      AgendaService,
      MonthAgendaService,
      ScheduleComponent,
      ResizeService,
      DragAndDropService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
