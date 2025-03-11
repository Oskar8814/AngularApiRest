import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos/articulos.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';

const routes: Routes = [
  { path: '', component: ArticulosComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'creararticulo', component: CrearArticuloComponent },
  { path: '**', redirectTo: 'articulos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
