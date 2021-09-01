import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'', component:ViewComponent},
  {path:'view', component:ViewComponent},
  {path:'view-details', component:ViewDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
