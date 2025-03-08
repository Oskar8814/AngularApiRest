import { Component } from '@angular/core';
import { ArticuloService } from '../articulo.service';
import { Iarticulo } from '../iarticulo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-articulo',
  standalone: false,
  templateUrl: './crear-articulo.component.html',
  styleUrl: './crear-articulo.component.css'
})
export class CrearArticuloComponent {
  descripcion: string = '';
  precio: number = 0;

  constructor(private articuloService: ArticuloService, private router: Router) { }

  crearArticulo(): void {
    const articulo: Iarticulo = {
      descripcion: this.descripcion,
      precio: this.precio
    };

    this.articuloService.createArticulo(articulo).subscribe(
      response => {
        console.log('Artículo creado:', response);
        // Redirigir a la lista de artículos después de crear
        this.router.navigate(['/articulos']);
      },
      error => {
        console.error('Error al crear el artículo:', error);
      }
    );
  }
}
