import { Injectable } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns/esm';
import { of } from 'rxjs';

export enum LeaveTypesEnum {
  Annual = "Annual",
  Sick = "Sick"
}

export type LeaveType = {
  type: string;
  label: string;
}

export type LeaveDetails = {
  id: string;
  leaveType: LeaveTypesEnum;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  leaves: LeaveDetails[] = [];

  constructor() { }

  applyLeave(leave: LeaveDetails) {
    // hard coded for demo
    this.leaves.push(leave);    
    return of(true);
  }

  getLeaves() {
    return of(this.leaves);
  }

  cancelLeave(eventId: string | undefined) {
    this.leaves.splice(this.leaves.findIndex((leave) => {
      return leave.id === eventId;
    }));    
    return of(true);
  }

  getDaysToAnnualLeave() {
    
    let dateDiff = 0;
    let isInitial = true;

    this.leaves.forEach((leave) => {
      if (leave.leaveType === LeaveTypesEnum.Annual) {
        const currentDiff = differenceInCalendarDays(new Date(leave.startDate), new Date());
        dateDiff = isInitial || (currentDiff < dateDiff) ? currentDiff : dateDiff;
        isInitial = false;
      }
    })

    return of(dateDiff);
  }
}
