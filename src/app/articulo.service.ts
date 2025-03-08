import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iarticulo } from './iarticulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'https://apiproyecto016.iesruizgijon.es/api/articulos';

  constructor(private http: HttpClient) { }

  listarArticulos(): Observable<any[]> {
    return this.http.get<Iarticulo[]>(this.apiUrl);
  }

  obtenerArticulo(id: number): Observable<any> {
    return this.http.get<Iarticulo>(`${this.apiUrl}/${id}`);
  }

  crearArticulo(articulo: Iarticulo): Observable<any> {
    return this.http.post<Iarticulo>(this.apiUrl, articulo);
  }

  actualizarArticulo(id: number, articulo: Iarticulo): Observable<any> {
    return this.http.put<Iarticulo>(`${this.apiUrl}/${id}`, articulo);
  }

  eliminarArticulo(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
