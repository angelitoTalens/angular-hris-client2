import { Component, OnInit } from '@angular/core';
import { Detail, UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  isPersonalDetailsHidden = true;
  isProfessionalDetailsHidden = true;

  personalDetails: Detail[] = [];
  professionalDetails: Detail[] = [];

  getPersonalDetails() {
    this.detailsService.getPersonalDetails()
      .subscribe(personalDetails => {
        this.personalDetails = personalDetails
      })
  }

  getProfessionalDetails() {
    this.detailsService.getProfessionalDetails()
      .subscribe(professionalDetails => {
        this.professionalDetails = professionalDetails
      })
  }

  constructor(private detailsService: UserDetailsService) { }

  ngOnInit(): void {
    this.getPersonalDetails();
    this.getProfessionalDetails();
  }

}
