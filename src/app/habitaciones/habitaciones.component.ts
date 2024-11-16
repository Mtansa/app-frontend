import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../servicios/auth.service";

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent {

  private apiUrl = 'http://localhost:3000/';
  data:any = [];
  constructor(private http:HttpClient, private auth:AuthService, private router:Router) {
  }
  ngOnInit(){

    if(!this.auth.isAuthenticated() || this.auth.getPerfil()!=='usuario'){
      alert('Ruta para usuarios de la plataforma, tu perfil es de Admin');
      this.router.navigate(['/login']);
      return
    }
    this.traerHabitaciones();
  }
  traerHabitaciones(){
    let token = localStorage.getItem('token');

    let head_obj = new HttpHeaders().set("Authorization", "Bearer "+token);
    this.http.get<any>(`${this.apiUrl}habitaciones`,{ 'headers': head_obj }).subscribe(
      (res: any) => {
        if (res.status == 403){

          return;
        }
        if (res.length > 0) {
          this.data = res;
        }
      })
  }
}
