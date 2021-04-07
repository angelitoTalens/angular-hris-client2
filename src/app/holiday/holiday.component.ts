import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (environment.production) {
      window.location.href = "https://www.nsw.gov.au/living-nsw/school-and-public-holidays";
    }
  }
}
