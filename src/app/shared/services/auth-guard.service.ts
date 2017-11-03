import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {JwtService} from "./jwt.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  //constructor(private router: Router, private cookieService: CookieService) { }
  constructor(private router: Router, private jwtService: JwtService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.jwtService.getToken() != null) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']/*, { queryParams: { returnUrl: state.url }}*/);
    return false;
  }

}

