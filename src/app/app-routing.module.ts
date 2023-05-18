import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';

const routes: Routes = [
  {path:"",redirectTo:'/home',pathMatch:"full"},
  {path:"home",component:HomeComponent,pathMatch:"full"},
  {path:"nosotros",component:NosotrosComponent,pathMatch:"full"}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
