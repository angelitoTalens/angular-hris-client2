import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sideNavClose = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  toggleNav(): void {
    this.sideNavClose = !this.sideNavClose;
  }

  logout(): void {
    this.loginService.logout()
      .subscribe(loggedOut => {
        if (loggedOut) {
          this.router.navigate(['login']);
        }
      });
  }
}
