import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../../models/employee';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { StoreService } from '../../service/store.service';
import { AlertBar } from '../../models/alert';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'emp-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {

  formMode: string;

  employeeForm: FormGroup; 
  firstName: FormControl;
  lastName: FormControl;
  dateOfJoining: FormControl;
  designation: FormControl;
  
  employee: Employee = new Employee();

  bsDatepickerConfig: Partial<BsDatepickerConfig>;
  today: Date = new Date();

  alertObj: AlertBar;

  subscriptions: Subscription[] = [];

  constructor(
    private storeService: StoreService
  ) {
    this.formMode = 'ADD_EMP';
  }

  ngOnInit() {
    this.bsDatepickerConfig = Object.assign({}, { containerClass: 'theme-green' });
    this.initFormBuild();
    this.alertObj = null;
    this.subscribeEditMode();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  subscribeEditMode() {
    const subscription = this.storeService.empOnEdit.subscribe(employee => {
      if (employee && 'id' in employee)
        this.populateEditForm(employee);
    });
    this.subscriptions.push(subscription);
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

  private populateEditForm(employee: Employee) {
    this.formMode = 'EDIT_EMP';
    this.resetForm();
    this.employee = Object.assign({}, employee);
    this.firstName.setValue(this.employee.firstName);
    this.lastName.setValue(this.employee.lastName);
    this.dateOfJoining.setValue(new Date (this.employee.dateOfJoining));
    this.designation.setValue(this.employee.designation);
  }

  save() {
    if (this.employee && this.employee.id)
      this.doUpdate();
    else
      this.doSave();
  }

  doSave() {
    this.storeService.create(this.employeeForm.value);
    this.resetForm();
    this.dateOfJoining.setValue(new Date());
    this.alertObj = new AlertBar(['Employee added!'], 'alert alert-success alert-dismissible', 6);
  }

  doUpdate() {
    const employee: Employee = {
      id: this.employee.id,
      firstName: this.employeeForm.controls.firstName.value,
      lastName: this.employeeForm.controls.lastName.value,
      dateOfJoining: new Date(this.employeeForm.controls.dateOfJoining.value),
      designation: this.employeeForm.controls.designation.value
    };
    this.storeService.update(employee);
    this.resetForm();
    this.dateOfJoining.setValue(new Date());
    this.alertObj = new AlertBar(['Employee updated!'], 'alert alert-success alert-dismissible', 6);
  }

  resetForm() {
    this.formMode = 'ADD_EMP';
    this.employeeForm.reset();
  }

}
