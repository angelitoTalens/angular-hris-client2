import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { PayslipService } from '../services/payslip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  news = 'No Announcements';

  payslipChart = {
    eventPretext: 'Until Your Next',
    eventName: 'Pay Day',
    color: 'rgb(92,184,92)',
    maxValue: 30,
    value: 0,
    buttonText: 'View Pay Slip',
    link: 'payslip',
  };

  annualLeaveChart = {
    eventPretext: 'Until Your Coming',
    eventName: 'Annual Leave',
    color: 'rgb(66,139,202)',
    maxValue: 40,
    value: 25,
    buttonText: 'View Leave',
    link: 'leave',
  };


  holidayChart = {
    eventPretext: 'Until Next',
    eventName: 'Public Holiday',
    color: 'rgb(217,83,79)',
    maxValue: 100,
    value: 56,
    buttonText: 'View Public Holidays',
    link: 'holiday',
  };

  constructor(
    private payslipService: PayslipService,
    private leaveService: LeaveService
  ) { }


  ngOnInit(): void {
    this.payslipService.getNextPayDay()
      .subscribe(nextPayDay => {
        this.payslipChart.maxValue = nextPayDay.daysInMonth;
        this.payslipChart.value = nextPayDay.daysUntilPayDay;
      });

    this.leaveService.getDaysToAnnualLeave()
      .subscribe(numDays => {
        this.annualLeaveChart.value = numDays;
      });
  }
}
