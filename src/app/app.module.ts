import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayslipComponent } from './payslip/payslip.component';
import { LeaveComponent } from './leave/leave.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveCalendarComponent } from './leave/leave-calendar/leave-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveFormComponent } from './leave/leave-form/leave-form.component';
import { HolidayComponent } from './holiday/holiday.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    MainComponent,
    LoginComponent,
    PayslipComponent,
    LeaveComponent,
    DetailsComponent,
    HomeComponent,
    ChartComponent,
    LeaveCalendarComponent,
    LeaveFormComponent,
    HolidayComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
