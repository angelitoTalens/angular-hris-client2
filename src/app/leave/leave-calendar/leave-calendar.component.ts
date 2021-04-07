import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { addMonths, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-leave-calendar',
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.scss']
})
export class LeaveCalendarComponent implements OnInit, OnChanges {

  viewDate = new Date();
  @Input() events: CalendarEvent<{ incrementsBadgeTotal: boolean }>[] = [];
  activeDayIsOpen = false;
  @Input() refresh: Subject<any> = new Subject();

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events && changes.events.currentValue) {
      this.events = changes.events.currentValue;
      this.closeActiveDay();
    }

    if (changes.refresh && changes.refresh.currentValue) {
      this.refresh = changes.refresh.currentValue
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      this.activeDayIsOpen = (events.length !== 0);
    }
  }

  closeActiveDay() {
    this.activeDayIsOpen = false;
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      day.badgeTotal = day.events.filter(
        event => event.meta.incrementsBadgeTotal
      ).length;
    });
  }

  // Calendar Header Methods

  prevMonth() {
    this.viewDate = addMonths(this.viewDate, -1);
  }

  currentMonth() {
    this.viewDate = new Date();
  }

  nextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
  }
}
