import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HolidayComponent } from './holiday/holiday.component';
import { HomeComponent } from './home/home.component';
import { LeaveComponent } from './leave/leave.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PayslipComponent } from './payslip/payslip.component';

const mainChildren: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'payslip', component: PayslipComponent, canActivate: [LoginGuard]},
  {path: 'leave', component: LeaveComponent, canActivate: [LoginGuard]},
  {path: 'details', component: DetailsComponent, canActivate: [LoginGuard]}, 
  {path: 'holiday', component: HolidayComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: 'home'}
];

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent, children: mainChildren, canActivateChild: [LoginGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
