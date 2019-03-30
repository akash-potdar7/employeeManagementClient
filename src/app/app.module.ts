import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
