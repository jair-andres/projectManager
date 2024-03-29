import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AboutusComponent } from './componentes/aboutus/aboutus.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { AdminUsersComponent } from './componentes/admin-users/admin-users.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { ProyectosDatalleComponent } from './componentes/proyectos-datalle/proyectos-datalle.component';
import { UpdateProjectComponent } from './componentes/update-project/update-project.component';

const routes: Routes = [
  {path:"",redirectTo:'/home',pathMatch:"full"},
  {path:"home",component:HomeComponent,pathMatch:"full"},
  {path:"aboutus",component:AboutusComponent,pathMatch:"full"},
  {path:"login",component:LoginComponent,pathMatch:"full"},
  {path:"register",component:RegisterComponent,pathMatch:"full"},
  {path:"contact",component:ContactComponent,pathMatch:"full"},
  {path:"dashboard",component:DashboardComponent,pathMatch:"full"},
  {path:"profile",component:ProfileComponent,pathMatch:"full"},
  {path:"adminuser",component:AdminUsersComponent,pathMatch:"full"},
  {path:"proyectos/:idProyecto",component:ProyectosDatalleComponent,pathMatch:"full"},
  {path:"updateProject/:idProject",component:UpdateProjectComponent,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
