import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Iarticulo } from './iarticulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'https://apiproyecto016.iesruizgijon.es/api/articulos';

  constructor(private http: HttpClient) { }

  listarArticulos(): Observable<any[]> {
    return this.http.get<{ articulos: Iarticulo[] }>(this.apiUrl).pipe(
      map(response => response.articulos), // Extrae el array de artículos
      catchError(error => {
        console.error('Error al crear artículo:', error);
        return throwError(() => new Error(error.message || 'Error desconocido'));
      })
    )
  }

  obtenerArticulo(id: number): Observable<any> {
    return this.http.get<Iarticulo>(`${this.apiUrl}/${id}`);
  }


  createArticulo(articulo: Iarticulo): Observable<any> {
    console.log('Datos enviados:', articulo);
    
    // Verificamos que no haya campos vacíos
    if (!articulo.descripcion || !articulo.precio) {
      throw new Error('Descripción o precio no pueden estar vacíos');
    }

    // Construir el objeto con clave "json" y valor como cadena JSON
    const body = new HttpParams().set('json', JSON.stringify(articulo));

    // Enviar la solicitud con 'application/x-www-form-urlencoded'
    return this.http.post(this.apiUrl, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }

  actualizarArticulo(id: number, articulo: Iarticulo): Observable<any> {
    return this.http.put<Iarticulo>(`${this.apiUrl}/${id}`, articulo);
  }

  eliminarArticulo(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
