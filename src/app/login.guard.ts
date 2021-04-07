import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private loginService: LoginService
  ){}

  canActivate(): Observable<boolean> {
    return this.loginService.isAuthenticated()
      .pipe(tap(isloggedIn => {
          if (isloggedIn !== true) {
            this.router.navigate(['/login']);
          }
      }))
  }
  canActivateChild(): Observable<boolean> {
    return this.loginService.isAuthenticated()
      .pipe(tap(isloggedIn => {
          if (isloggedIn !== true) {
            this.router.navigate(['/login']);
          }
      }))
  }
}
