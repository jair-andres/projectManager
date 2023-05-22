import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MainComponent } from './componentes/main/main.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { ArgumentsComponent } from './componentes/arguments/arguments.component';
import { InfoComponent } from './componentes/info/info.component';
import { ConectateComponent } from './componentes/conectate/conectate.component';
import { RegistrateComponent } from './componentes/registrate/registrate.component';
import { ContactanosComponent } from './componentes/contactanos/contactanos.component';
import { RegisterUserComponent } from './componentes/register-user/register-user.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdminUsersComponent } from './componentes/admin-users/admin-users.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    MenuComponent,
    FooterComponent,
    MainComponent,
    CarouselComponent,
    ArgumentsComponent,
    InfoComponent,
    ConectateComponent,
    RegistrateComponent,
    ContactanosComponent,
    RegisterUserComponent,
    LoginComponent,
    AdminUsersComponent,
    MensajesComponent
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
