import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'emp-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup; 
  firstName: FormControl;
  lastName: FormControl;
  dateOfJoining: FormControl;
  designation: FormControl;
  
  employee: Employee = new Employee();

  bsDatepickerConfig: Partial<BsDatepickerConfig>;
  today: Date = new Date();

  ngOnInit() {
    this.bsDatepickerConfig = Object.assign({}, { containerClass: 'theme-green' });
    this.initFormBuild();
  }

  private initFormBuild(): void {
    this.buildFormControls();
    this.buildForm();
  }


  private buildFormControls(): void {
    this.firstName = new FormControl('', Validators.required);
    this.firstName.setValue(this.employee.firstName);

    this.lastName = new FormControl('', Validators.required);
    this.lastName.setValue(this.employee.lastName);

    this.dateOfJoining = new FormControl('', Validators.required);
    this.dateOfJoining.setValue(new Date());

    this.designation = new FormControl('', Validators.required);
    this.designation.setValue(this.employee.designation);
  }

  private buildForm(): void {
    this.employeeForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfJoining: this.dateOfJoining,
      designation: this.designation
    });
  }

  save() {
    console.log(this.employeeForm.value);
  }

}
