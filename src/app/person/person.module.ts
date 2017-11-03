import {NgModule} from "@angular/core";
import {PersonListComponent} from "./person-list.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardService} from "../shared/services/auth-guard.service";

const personRoutes: Routes = [
  {
    path: '',
    children:[
      {path: 'all', component: PersonListComponent, canActivate: [AuthGuardService]}
    ]
  }
]

@NgModule({
  declarations: [
    PersonListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(personRoutes)
  ],
  exports: [
    PersonListComponent,
    RouterModule
  ]
})
export class PersonModule {}
