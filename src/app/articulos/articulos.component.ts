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

  idBusqueda: number = 0;

  constructor(private articuloService: ArticuloService){}

  ngOnInit(): void {
    this.listarArticulos();
  }

  //Metodo acc para actualizar articulos y cargar los articulos
  listarArticulos(): void {
    this.articuloService.listarArticulos().subscribe(data => this.articulos = data);
  }

  // Función para buscar artículo por ID
  buscarArticuloPorId(): void {
    if (this.idBusqueda !== null && this.idBusqueda > 0) {
      this.articuloService.obtenerArticulo(this.idBusqueda).subscribe(
        (articulo) => {
          // Actualiza el array articulos con solo el artículo encontrado
          this.articulos = [articulo];
          // console.log(this.articulos); 
        }
      );
    } 
  }

  actualizarArticulo(): void {
    if (this.articuloSeleccionado) {

      const articuloActualizado: Iarticulo = {
        descripcion: this.descripcion,
        precio: this.precio
      };

      this.articuloService.updateArticulo(this.articuloSeleccionado.id, articuloActualizado).subscribe(() => {
        this.listarArticulos();
        this.articuloSeleccionado = null; // Limpiar la selección
      });
    }
  }
  
  eliminarArticulo(id: number): void {
    this.articuloService.deleteArticulo(id).subscribe(() => this.listarArticulos());
  }

  //Metodo acc para editar
  seleccionarArticulo(articulo: Iarticulo): void {
    this.articuloSeleccionado = { ...articulo };
    this.descripcion = articulo.descripcion;
    this.precio = articulo.precio;
  }
}
