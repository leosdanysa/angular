import {Component, OnInit} from "@angular/core";
import {LoginService} from "../shared/services";

@Component ({
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  username: string = 'not-logged';
  logged: boolean = false;
  title = 'Angular Rest Application';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.logged = this.loginService.isLogged();
    this.username = this.loginService.getUsername();
  }

  /*logout(): void {
    this.loginService.logout();
  }*/

}
