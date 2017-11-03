//import {PersonListComponent}  from "./person/person-list.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule}             from "@angular/core";
import {LoginComponent} from "./login/login.component";


//import {AuthGuardService}     from "./shared";
//import {HomeComponent}        from "./home/home.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home', loadChildren: 'app/home/home.module#HomeModule'/*, canActivate: [AuthGuardService]*/ },//Lazy loading
  {path: 'person', loadChildren: 'app/person/person.module#PersonModule'/*, canActivate: [AuthGuardService] */}//Lazy loading
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes//,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
