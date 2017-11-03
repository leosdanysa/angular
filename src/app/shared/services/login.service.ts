import {Router} from '@angular/router';

import {Authentication} from '../model';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
// import {CookieService} from "ngx-cookie-service";
import {/*HttpClient,*/ HttpParams} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ApiService} from './api.service';

@Injectable()
export class LoginService {
  // Behavior Subject
  private currentAuthenticationSubject = new BehaviorSubject<Authentication>(new Authentication());
  public currentAuthentication = this.currentAuthenticationSubject.asObservable().distinctUntilChanged();
  // Replay Subject
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  // constructor(private http: HttpClient, private router: Router, private  cookieService: CookieService){ }
  constructor(/*private http: HttpClient, */
              private router: Router,
              private jwtService: JwtService,
              private apiService: ApiService
  ) { }

  populate(): void {

    if (this.jwtService.getToken() != null) {
      const authentication = JSON.parse(this.jwtService.getToken()) as Authentication;

      if (authentication) {
        this.login(authentication.principal, authentication.credentials);
      }
    } else {
      this.logout();
    }
  }

  login(username: string, password: string): Observable<Authentication> {
    const params = new HttpParams().set('username', username).append('password', password);

    return this.apiService
      .get('/login', params)
      .map(response => {
        const authentication = response as Authentication;

        if (authentication.authenticated) {
          // Local Storage
          this.jwtService.saveToken(JSON.stringify(authentication));

          this.currentAuthenticationSubject.next(authentication);

          this.isAuthenticatedSubject.next(true);

          // Cookies
          /*this.cookieService.set('authenticatedUser',
            JSON.stringify(authentication),
            new Date(Date.now() + 30 * 60 * 1000)

           authentication =  JSON.parse(this.cookieService.get('authenticatedUser')) as Authentication;
          )*/

          // authentication =  JSON.parse(this.jwtService.getToken()) as Authentication;

          return authentication;
        } else {
          this.currentAuthenticationSubject.next(new Authentication());

          this.isAuthenticatedSubject.next(false);
        }

        return this.currentAuthenticationSubject.value;
      });
  }

  logout(): void {
    // Local Storage
    this.jwtService.destroyToken();

    this.currentAuthenticationSubject.next(new Authentication());
    this.isAuthenticatedSubject.next(false);

    // Cookies
    // this.cookieService.delete('authenticatedUser');

    this.router.navigate(['login']);
  }

  isLogged(): boolean {
    // Local Storage
    return (this.jwtService.getToken()) ? true : false;

    // Cookies
    // return this.cookieService.check('authenticatedUser');

    // return this.isAuthenticated.;
  }

  getUsername(): string {
    if (this.isLogged()) {
      return this.currentAuthenticationSubject.value.principal;
    }
    return null;
  }
}
