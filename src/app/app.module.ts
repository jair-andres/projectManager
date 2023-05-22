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
    ContactanosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
