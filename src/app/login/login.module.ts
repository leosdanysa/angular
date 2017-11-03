import {NgModule}       from "@angular/core";
import {SharedModule}   from "../shared";
import {LoginComponent} from "./login.component";
import {RouterModule, Routes} from "@angular/router";

const loginRoutes: Routes = [
  {
    path: '',
    children:[
      {path: '', component: LoginComponent}
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(loginRoutes)
  ],
 exports: [
   LoginComponent,
   RouterModule
 ]
})
export class LoginModule {}
