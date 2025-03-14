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
        console.error('Error al listar artículos:', error);
        return throwError(() => new Error(error.message || 'Error desconocido'));
      })
    )
  }

  obtenerArticulo(id: number): Observable<any> {
    // console.log(id);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.articulo)
    )
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

  updateArticulo(id: number, articulo: Iarticulo): Observable<any> {
    // Construir el objeto con clave "json" y valor como cadena JSON
    const body = new HttpParams().set('json', JSON.stringify(articulo));
    
    // console.log(body);
    // Enviar la solicitud con 'application/x-www-form-urlencoded'
    return this.http.put(`${this.apiUrl}/${id}`, body, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }

  deleteArticulo(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
