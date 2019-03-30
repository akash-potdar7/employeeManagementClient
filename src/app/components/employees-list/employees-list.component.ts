import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { Employee } from '../../models/employee';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'emp-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  columns: string[] = ["FIRST NAME", "LAST NAME", "DATE OF JOINING", "DESIGNATION"];
  employees: Observable<Employee[]>;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.employees = this.storeService.employees;
    this.storeService.loadAllEmployees();
  }

}
