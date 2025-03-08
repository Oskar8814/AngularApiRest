import { Component, OnInit } from '@angular/core';
import { Iarticulo } from '../iarticulo';
import { ArticuloService } from '../articulo.service';

@Component({
  selector: 'app-articulos',
  standalone: false,
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css'
})
export class ArticulosComponent implements OnInit {
  articulos: Iarticulo [] = [];
  articuloSeleccionado: any = null;

  descripcion: string = '';
  precio: number = 0;

  constructor(private articuloService: ArticuloService){}

  ngOnInit(): void {
    this.listarArticulos();
  }

  listarArticulos(): void {
    this.articuloService.listarArticulos().subscribe(data => this.articulos = data);
  }

  seleccionarArticulo(articulo: Iarticulo): void {
    this.articuloSeleccionado = { ...articulo };
  }

  crearArticulo() {
    // Crear el objeto con la información del artículo
    const articulo: Iarticulo = {
      descripcion: this.descripcion,
      precio: this.precio
    };

    this.articuloService.createArticulo(articulo).subscribe(
      (response) => {
        console.log('Artículo creado:', response);
      },
      (error) => {
        console.error('Error al crear el artículo', error);
      }
    );
  }

  actualizarArticulo(): void {
    if (this.articuloSeleccionado) {
      this.articuloService.actualizarArticulo(this.articuloSeleccionado.id, this.articuloSeleccionado).subscribe(() => {
        this.listarArticulos();
        this.articuloSeleccionado = null;
      });
    }
  }
  
  eliminarArticulo(id: number): void {
    this.articuloService.eliminarArticulo(id).subscribe(() => this.listarArticulos());
  }
}
