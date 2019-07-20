import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AlertService, DashboardService } from '../../app/_services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateuserComponent } from '../../app/updateuser/updateuser.component';
import { RegistrationComponent } from '../../app/registration/registration.component';
export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
  address: string;

}

//const ELEMENT_DATA: PeriodicElement[] = [
  //{position: 1, name: 'Hydrogen', email: 'test@test.com', address: 'test address'},
 // {position: 2, name: 'test name', email: 'test1@test.com', address: 'test address' },
 // {position: 3, name: 'pratap', email: 'pratap@test.com', address: 'test address' }
  
//]; //test table data
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
clientid:string;
animal:string;
data:String[];
  constructor(private dashboardService: DashboardService,public dialog: MatDialog,
        private alertService: AlertService) { }
 
  ngOnInit() {
  this.gtlistfunction();
  this.animal='sajdasjldkajsldkjalsd';
  }
openDialog(): void {
    const dialogRef = this.dialog.open(UpdateuserComponent, {
      width: '250px',
      data: { animal: this.animal}
    });}


  gtlistfunction(){
    this.clientid=localStorage.getItem("clientid");
    //DashboardService
    this.dashboardService.getUserlist(this.clientid,'getuserlist') .pipe(first())
            .subscribe(
                data => {
                    this.dataSource=data["profile"];
                     
                },
                error => {
                    this.alertService.error(error);
                    
                });
  }

  deleteFunction(userid,i){
    this.dashboardService.deleteuserService(userid,this.clientid,'deleteuser') .pipe(first())
            .subscribe(
                data1 => {
                    //this.dataSource.splice(this.dataSource.indexOf(userid), 1);
                    //this.dataSource._updateChangeSubscription();
                    this.gtlistfunction();
                },
                error => {
                    this.alertService.error(error);
                    
                });
  }
  displayedColumns: string[] = ['position', 'name', 'email', 'address','action'];
  dataSource = ELEMENT_DATA;
  
}
