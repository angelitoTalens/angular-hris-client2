import { Component, HostListener, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { Subject } from 'rxjs';
import { LeaveDetails, LeaveService } from '../services/leave.service';

type EventColor = {
  primary: string;
  secondary: string;
}

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  calendarEvents: CalendarEvent<{ incrementsBadgeTotal: boolean }>[] = [];
  calendarRefresh: Subject<any> = new Subject();
  // readonly mediumWidth = "(min-width: 768px)";
  // mediaQuery = window.matchMedia(this.mediumWidth).matches;  

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    // this.addCalendarEvent("testLeave", new Date(), new Date(), {
    //   primary: '#757575',
    //   secondary: '#f5f5f5'
    // });
    this.leaveService.getLeaves()
      .subscribe(leaves => {
        leaves.forEach((leave) => {
          this.addCalendarEvent(
            leave.leaveType,
            leave.reason,
            new Date(leave.startDate),
            new Date(leave.endDate)      
          );        
        });
      })
  }


  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.removeLeave(event);
    }
  }];

  addCalendarEvent(eventType: string, reason: string, startDate: Date, endDate: Date, color?: EventColor) {
    this.calendarEvents.push({
      id: eventType + startDate.toISOString() + endDate.toISOString(),
      title: eventType + " - " + reason,
      start: startDate,
      end: endDate,
      color: color,
      draggable: false,
      actions: this.actions,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      meta: {
        incrementsBadgeTotal: false
      },
    });
    this.calendarRefresh.next();
  }

  addLeave(leave: LeaveDetails) {
    this.leaveService.applyLeave(leave)
      .subscribe(submitted => {
        if (submitted) {
          this.addCalendarEvent(
            leave.leaveType,
            leave.reason,
            new Date(leave.startDate),
            new Date(leave.endDate)      
          );
        }
      });    
  }

  removeLeave(event: CalendarEvent) {
    this.leaveService.cancelLeave(event.id?.toString())
      .subscribe(cancelled => {
        if (cancelled) {
           this.calendarEvents = this.calendarEvents.filter(iEvent => iEvent !== event); 
        }
      });
  }

  // @HostListener("window:resize", [])
  // private onResize() {
  //   this.mediaQuery = window.matchMedia(this.mediumWidth).matches;
  // }
}
