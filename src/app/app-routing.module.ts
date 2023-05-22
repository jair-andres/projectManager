import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { ConectateComponent } from './componentes/conectate/conectate.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { ContactanosComponent } from './componentes/contactanos/contactanos.component';

const routes: Routes = [
  {path:"",redirectTo:'/home',pathMatch:"full"},
  {path:"home",component:HomeComponent,pathMatch:"full"},
  {path:"nosotros",component:NosotrosComponent,pathMatch:"full"},
  {path:"conectate",component:ConectateComponent,pathMatch:"full"},
  {path:"registrate",component:RegistrateComponent,pathMatch:"full"},
  {path:"contactanos",component:ContactanosComponent,pathMatch:"full"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
