import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { ReservationsService } from '../_services/reservations.service';
import { Reservation } from '../_models/reservation';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { TeeTime } from '../_models/teeTime';
import { Router } from '@angular/router';
import { Approval } from '../_models/approval';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})

export class ReservationsComponent {
  private ELEMENT_DATA: Reservation[] = [];
  public dataSource;
  public displayedColumns;

  ngOnInit() {
    // this.loadData();
  }
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private reserv: ReservationsService, public authService: AuthService,
              public alertify: AlertifyService, public router: Router) {
    // this.loadData();
    if (localStorage.getItem('role') === 'Admin') {
      console.log('Admin');
      this.reserv.getteeTimes().subscribe(results => {
        if(!results) {return; }
        this.ELEMENT_DATA = results;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        console.log(results);
        this.displayedColumns = ['id', 'subject', 'recurringData', 'approval', 'action']
      });
    } else if (localStorage.getItem('role') === 'User' || localStorage.getItem('role') === 'Member') {
      const roleId = localStorage.getItem('role') === 'User' ? 2 : 3;
      if (roleId === 2) {
        console.log('User');
      } else {
        console.log('Member');
      }
      this.reserv.getteeTimesById(roleId).subscribe(results => {
        if(!results) {return; }
        this.ELEMENT_DATA = results;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.displayedColumns = ['id', 'subject', 'recurringData', 'approval', 'action']
      });
    }
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if(result.event === 'Update'){
        this.updateRowData(result.data);
      } else if(result.event === 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    // var d = new Date();
    // this.dataSource.push({
    //   id:d.getTime(),
    //   name:row_obj.name
    // });
    // this.table.renderRows();
  }
  updateRowData(row_obj){
    // this.dataSource = this.dataSource.filter((value,key)=>{
    //   if(value.id == row_obj.id){
    //     value.name = row_obj.name;
    //   }
    //   return true;
    // });
    this.reserv.ApproveReservation(row_obj).subscribe(next => {
      this.alertify.success('Approved successfully');
    }, error => {
      this.alertify.error(error);
    });
  }
  deleteRowData(row_obj){
    this.reserv.RemoveReservation(row_obj.id).subscribe(next => {
      this.alertify.success('Deleted successfully');
      this.router.navigateByUrl('/appointment');
    }, error => {
      this.alertify.error(error);
    });
  }

  public localStorageItem(): string {
    return localStorage.getItem('role');
  }

}
