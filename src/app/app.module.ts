import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import {AppRoutingModule}       from "./app-routing.module";

import { AppComponent }         from './app.component';
//import {PersonListComponent}    from "./person/person-list.component";
//import {LoginComponent}         from "./login/login.component";

import {
  PersonService,
  LoginService,
  AuthGuardService,
  ApiService,
  JwtService,
  HttpHeaderInterceptor,
  LayoutHeaderComponent,
  UploadFileService}        from "./shared";

//import {HomeComponent}          from "./home/home.component";
import {CookieService}          from "ngx-cookie-service";

import {HTTP_INTERCEPTORS/*, HttpClientModule*/}      from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {LoginModule} from "./login/login.module";
import {CookieXSRFStrategy, XSRFStrategy} from "@angular/http";

@NgModule({
  imports: [
    BrowserModule,
    LoginModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    //HomeComponent,
    //PersonListComponent,
    //LoginComponent,
    LayoutHeaderComponent
  ],
  providers: [
    ApiService,
    JwtService,
    PersonService,
    LoginService,
    AuthGuardService,
    UploadFileService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true
    }/*,
    {
      provide: XSRFStrategy,
      useFactory: xsrfFactory
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function xsrfFactory() {
  return new CookieXSRFStrategy('XSRF-TOKEN', 'XSRF-TOKEN');
}
