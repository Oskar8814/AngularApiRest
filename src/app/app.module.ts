import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ArticulosComponent } from './articulos/articulos.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    CrearArticuloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
