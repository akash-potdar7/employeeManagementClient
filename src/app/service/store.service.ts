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

  baseApi: string = "https://5c9f7c351afd06001466877a.mockapi.io";

  employees: Observable<Employee[]>;
  private _employees: BehaviorSubject<Employee[]>;

  constructor(
      private http: HttpClient
  ) {
    this.employeeDataStore = {employees: []};
    this._employees = <BehaviorSubject<Employee[]>>new BehaviorSubject([]);
    this.employees = this._employees.asObservable();
  }

  fetchEmployees() {
    this.http.get(`${this.baseApi}/employee`).subscribe(
      (empData: any) => {
        console.log('employees', empData)
        this.employeeDataStore.employees = empData;
        this._employees.next(
          Object.assign({}, this.employeeDataStore).employees
        );
      },
      () => console.log("Could not load employees")
    );
  }

  create(employee: Employee) {
    this.http.post(`${this.baseApi}/employee`, employee).subscribe(
      (data: Employee) => {
        console.log('Added!', data)
        this.employeeDataStore.employees.push(data);
        this._employees.next(Object.assign({}, this.employeeDataStore).employees);
      },
      () => console.log('Could not create employee.'));
  }

  delete(employeeId: number) {
    this.http.delete(`${this.baseApi}/employee/${employeeId}`).subscribe(
        reponse => {
            console.log('deleted!', reponse);
            this.employeeDataStore.employees.forEach((e, i) => {
                if (e.id === employeeId)
                    this.employeeDataStore.employees.splice(i, 1)
            });
        },
        () => console.log('Could not delete employee.'));
  }

}
