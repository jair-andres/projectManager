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
import { HttpClientModule } from '@angular/common/http';
import { AboutusComponent } from './componentes/aboutus/aboutus.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { NotificationComponent } from './componentes/notification/notification.component';

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
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
