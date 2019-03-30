import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Employee } from "../models/employee";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class StoreService {
  
  private employeeDataStore: {
    employees: Employee[];
    employeeOnEdit: Employee;
  };

  baseApi: string = "https://5c9f7c351afd06001466877a.mockapi.io";

  employees: Observable<Employee[]>;
  private _employees: BehaviorSubject<Employee[]>;

  empOnEdit: Observable<Employee>;
  private _emp: BehaviorSubject<Employee>;

  constructor(
      private http: HttpClient
  ) {
    this.employeeDataStore = {employees: [], employeeOnEdit: null};
    this._employees = <BehaviorSubject<Employee[]>>new BehaviorSubject([]);
    this.employees = this._employees.asObservable();

    this._emp = <BehaviorSubject<Employee>>new BehaviorSubject(null);
    this.empOnEdit = this._emp.asObservable();
  }

  setEmployeeOnEdit(employee: Employee) {
    this.employeeDataStore.employeeOnEdit = employee;
    this._emp.next(employee);
  }

  fetchEmployees() {
    this.http.get(`${this.baseApi}/employee`).subscribe(
      (empData: any) => {
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
        this.employeeDataStore.employees.push(data);
        this._employees.next(Object.assign({}, this.employeeDataStore).employees);
      },
      () => console.log('Could not create employee.'));
  }

  update(employee: Employee) {
    this.http.put(`${this.baseApi}/employee/${employee.id}`, employee).subscribe(
        (data: Employee) => {
            this.employeeDataStore.employees.forEach((e, i) => {
            if (e.id === data.id)
                this.employeeDataStore.employees[i] = data;
        });
        this._employees.next(Object.assign({}, this.employeeDataStore).employees);
      },
      () => console.log('Could not update employee.'));
  }

  delete(employeeId: number) {
    this.http.delete(`${this.baseApi}/employee/${employeeId}`).subscribe(
        reponse => {
            console.log('deleted!', reponse);
            this.employeeDataStore.employees.forEach((e, i) => {
                if (e.id === employeeId)
                    this.employeeDataStore.employees.splice(i, 1);
            });
            this.setEmployeeOnEdit(null);
        },
        () => console.log('Could not delete employee.'));
  }

}
