import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';

interface TokenPayload {
  exp: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password, role });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  getPerfil(): string | null {
    return localStorage.getItem('perfil');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  reservar(data: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/reservacion`, data );
  }

  verificar(data: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/verificarReserva`, data );
  }

  reservasxusuario(id: any):Observable<any> {
    return this.http.get(`${this.apiUrl}/reservasxcliente/${id}`);
  }

  reservasall():Observable<any> {
    return this.http.get(`${this.apiUrl}/reservas`);
  }

  cancelar(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cancelareserva/${id}`);
  }


  confirmareserva(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/confirmareserva/${id}`;
    /*const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    , { headers }
    */
    return this.http.put(url, data);
  }

  actualizarUsuario(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/actualizarusuario/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, data, { headers });
  }

  registrar(data: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, data );
  }

  usuarios():Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios`);
  }

  logout(){
    localStorage.clear()
  }

  actualizarUsuarios(id: any, usuarioData: { nombre: string; email: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizarusuario/${id}`, usuarioData);
  }

  eliminaUsuarios(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminarusuario/${id}`);
  }

  habitaciones():Observable<any> {
    return this.http.get(`${this.apiUrl}/habitaciones`);
  }

  habitacionesall():Observable<any> {
    return this.http.get(`${this.apiUrl}/habitacionesall`);
  }

  actualizarHabitacion(id: any, habitacionData: { numero: string; tipo: string; descripcion: string, precio:number, estado: string   }): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizarhabitacion/${id}`, habitacionData);
  }

  registrarHabitacion(data: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/crearhabitacion`, data );
  }


}
