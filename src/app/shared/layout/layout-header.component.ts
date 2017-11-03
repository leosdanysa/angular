import {Component, OnInit} from "@angular/core";
import {LoginService} from "../services/login.service";
import {Authentication} from "../model/authentication";

@Component ({
  selector: 'layout-header',
  templateUrl: './layout-header.component.html'
})

export class LayoutHeaderComponent implements OnInit {

  isAuthenticated: boolean;
  authentication: Authentication;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentAuthentication.subscribe(data => {
      this.authentication = data;
    });

    //Call service to subscribe to know when the user is authenticated or not
    this.loginService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.isAuthenticated = this.loginService.isLogged();
  }

  logout(): void {
    this.loginService.logout();

    //redirect to login page
  }
}
