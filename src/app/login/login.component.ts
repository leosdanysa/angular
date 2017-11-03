import {Component, OnInit} from '@angular/core';
import {LoginService} from '../shared';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  user: any = {};
  returnUrl: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    // this.loginService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.loading = true;

    this.loginService.login(this.user.username, this.user.password)
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          this.router.navigate(['home']);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

}
