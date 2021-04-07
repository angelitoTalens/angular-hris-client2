import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type Detail = {
  label: string,
  value: string
}


@Injectable({
  providedIn: 'root'
})


export class UserDetailsService {

  getPersonalDetails(): Observable<Detail[]> {
      // Hardcoded for Demo, replaced with server call

    const personalDetails: Detail[] = [
        {label: 'First Name', value: 'Angelito', },
        {label: 'Surname', value: 'Talens'},
        {label: 'Address', value: ''},
        {label: 'State', value: ''},
        {label: 'Postal Code', value: ''},
        {label: 'Country', value: ''},
        {label: 'Gender', value: ''}
    ];
    return of(personalDetails);
  }

  getProfessionalDetails() {
      // Hardcoded for Demo, replaced with server call

      const professionalDetails: Detail[] = [
        {label: 'Position', value: 'Software Engineer'},
        {label: 'Reporting To', value: ''},
        {label: 'Department', value: ''},
        {label: 'Email', value: 'angelito.talens@gmail.com'}
    ];

    return of(professionalDetails);
  }

  constructor() { }
}
