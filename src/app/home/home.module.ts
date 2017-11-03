import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../shared";

const homeRoutes: Routes = [
  {
    path: '',
    children:[
      {path: '', component: HomeComponent, canActivate: [AuthGuardService]}
    ]
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    HomeComponent,
    RouterModule
  ]
})
export class HomeModule {

}
