import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StoreService {
  
  private employeeDataStore: {
    employees: Employee[];
  };

  MOCK_EMPLOYEES_URL: string = "http://www.mocky.io/v2/5c9f7b6b3300000f00a87d14";

  employees: Observable<Employee[]>;
  private _employees: BehaviorSubject<Employee[]>;

  constructor(
      private http: HttpClient
  ) {
    this.employeeDataStore = {employees: []};
    this._employees = <BehaviorSubject<Employee[]>>new BehaviorSubject([]);
    this.employees = this._employees.asObservable();
  }

  loadAllEmployees() {
    this.http.get(this.MOCK_EMPLOYEES_URL).subscribe(
      (empData: any) => {
        console.log('employess', empData)
        this.employeeDataStore.employees = empData;
        this._employees.next(
          Object.assign({}, this.employeeDataStore).employees
        );
      },
      error => console.log("Could not load employees")
    );
  }
}
