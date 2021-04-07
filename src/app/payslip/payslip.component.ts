import { Component, OnInit } from '@angular/core';
import { addMonths } from 'date-fns';
import { Payslip, PayslipService } from '../services/payslip.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {

  readonly months = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'Novemeber', 'December'];
  date = new Date();

  payslips: Payslip[] = [];

  constructor(private payslipService: PayslipService) { }

  ngOnInit(): void {
    this.getPayslips(this.date);
  }

  getMonth(): string {
    return this.months[this.date.getMonth()];
  }

  getYear(): string {
    return this.date.getFullYear().toString();
  }

  prevMonth(): void {
    this.date = addMonths(this.date, -1);
    this.getPayslips(this.date);
  }

  nextMonth(): void {
    this.date = addMonths(this.date, 1);
    this.getPayslips(this.date);
  }

  getPayslips(date: Date) {
    this.payslipService.getPayslipDetails(date)
      .subscribe(payslips => {
        this.payslips = payslips;
      })
  }
}
