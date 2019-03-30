// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { AlertBarComponent } from './utils/alert-bar/alert-bar.component';
import { HeaderComponent } from './components/header/header.component';

// services

// 3rd party modules and services
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreService } from './service/store.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeesListComponent,
    AlertBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
