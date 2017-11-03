import {NgModule}         from "@angular/core";
import {CommonModule}     from "@angular/common";
import {FormsModule}      from "@angular/forms";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {RouterModule}     from "@angular/router";

import {
  IfAuthenticatedDirective,
  UnlessDirective }         from "./directives";
import {UploadFileComponent} from "./components";

@NgModule({
  declarations: [
    IfAuthenticatedDirective,
    UnlessDirective,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'XSRF-TOKEN',
    }),
    RouterModule
  ],
  exports: [
    IfAuthenticatedDirective,
    UnlessDirective,
    UploadFileComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ]
})

export class SharedModule {}
