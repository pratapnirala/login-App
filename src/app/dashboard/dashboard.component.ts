import { Component, OnInit } from '@angular/core';





export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', email: test@test.com, address: 'test address'},
  {position: 2, name: 'test name', email: test1@test.com, address: 'test address' },
  {position: 3, name: 'pratap', email: pratap@test.com, address: 'test address' }
  
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 displayedColumns: string[] = ['position', 'name', 'email', 'address','action'];
  dataSource = ELEMENT_DATA;
}
