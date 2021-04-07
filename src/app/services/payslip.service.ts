import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isSameMonth, isSameYear, addMonths, getDaysInMonth } from 'date-fns';


export type Payslip = {
  date: string;
  gross: number;
  tax: number;
  net: number;
  link: string;
};

@Injectable({
  providedIn: 'root'
})


export class PayslipService {

  payslips: Payslip[] = [
    {
      date: new Date().toJSON().split('T')[0],
      gross: 1000,
      tax: 100,
      net: 900,
      link: ''
    },
    {
      date: addMonths(new Date(), 1).toJSON().split('T')[0],
      gross: 1500,
      tax: 150,
      net: 1300,
      link: ''
    }
  ];  

  constructor() { }

  getPayslipDetails(date: Date): Observable<Payslip[]> {
    // Hardcoded for Demo, replaced with server call
    let payslip: Payslip[] = [];

    this.payslips.forEach(item => {
      const itemDate: Date = new Date(item.date);
      if (isSameMonth(date, itemDate) && isSameYear(date, itemDate)) {
        payslip.push(item);
      }
    });

    return of(payslip);
  }

  getNextPayDay() {

    const date = new Date();

    const payDay = {
      daysInMonth: getDaysInMonth(date), 
      daysUntilPayDay: getDaysInMonth(date) - date.getDate()
    }
    return of(payDay);
  }

}
