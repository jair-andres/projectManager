import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { ArgumentsComponent } from './componentes/arguments/arguments.component';
import { InfoComponent } from './componentes/info/info.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdminUsersComponent } from './componentes/admin-users/admin-users.component';
import { FormsModule } from '@angular/forms';
import { AboutusComponent } from './componentes/aboutus/aboutus.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { NotificationComponent } from './componentes/notification/notification.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor.service';
import { UploadFilesComponent } from './componentes/upload-files/upload-files.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { TestSessionComponent } from './componentes/test-session/test-session.component';
import { ProjectsComponent } from './componentes/projects/projects.component';
import { CreateProjectComponent } from './componentes/create-project/create-project.component';
import { TasksComponent } from './componentes/tasks/tasks.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { PqrsComponent } from './componentes/pqrs/pqrs.component';
import { SearchbarComponent } from './componentes/searchbar/searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    CarouselComponent,
    ArgumentsComponent,
    InfoComponent,
    LoginComponent,
    AdminUsersComponent,
    AboutusComponent,
    RegisterComponent,
    ContactComponent,
    NotificationComponent,
    UploadFilesComponent,
    DashboardComponent,
    TestSessionComponent,
    ProjectsComponent,
    CreateProjectComponent,
    TasksComponent,
    ProfileComponent,
    PqrsComponent,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
