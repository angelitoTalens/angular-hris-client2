import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveDetails, LeaveType, LeaveTypesEnum } from '../../services/leave.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {

  @Output() leaveEvent = new EventEmitter<LeaveDetails>();

  leaveForm = new FormGroup({
    leaveType: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    reason: new FormControl('')
  });

  get leaveType() {
    return this.leaveForm.get('leaveType');
  }

  get startDate() {
    return this.leaveForm.get('startDate');
  }

  get endDate() {
    return this.leaveForm.get('endDate');
  }

  get reason() {
    return this.leaveForm.get('reason');
  }

  minDate = new Date().toJSON().split('T')[0];

  leaveTypes: LeaveType[] = [
    { type: LeaveTypesEnum.Annual, label: "Annual Leave" },
    { type: LeaveTypesEnum.Sick, label: "Sick Leave" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const leave: LeaveDetails = {
      id: this.leaveType?.value + new Date(this.startDate?.value).toISOString() + new Date(this.endDate?.value).toISOString(),
      leaveType: this.leaveType?.value,
      startDate: this.startDate?.value,
      endDate: this.endDate?.value,
      reason: this.reason?.value,
      status: ""
    };
    this.leaveEvent.emit(leave);
  }

}
