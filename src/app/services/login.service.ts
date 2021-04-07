import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor() { }

  readonly sessionItem = {
    key: "authenticate",
    value: "true"
  }

  isAuthenticated() {    
    return of(sessionStorage.getItem(this.sessionItem.key) === this.sessionItem.value);
  }

  login(email: string, password: string) {
    sessionStorage.setItem(this.sessionItem.key, this.sessionItem.value);
    return this.isAuthenticated();
  }

  logout() {
    sessionStorage.removeItem(this.sessionItem.key);
    return of(this.isAuthenticated());
  }
}
