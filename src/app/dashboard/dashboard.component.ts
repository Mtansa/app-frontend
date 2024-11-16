import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../servicios/auth.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink, LoginComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  auth = inject(AuthService);
  route = inject(Router);
  reservas:any = [];
  nombre:any="";
  perfil:any = '';


  ngOnInit(){
    this.perfil = this.auth.getPerfil();
    if(!this.auth.isAuthenticated() || this.perfil !== 'usuario' ){
      alert('No esta autenticado, por favor haga inicio de sesion para reservar o consultar sus reservaciones');
      this.route.navigate(['/login']);
      return
    }
    this.nombre = this.auth.getNombre();
    this.reservasxusuario();
  }

  reservasxusuario(){
    this.auth.reservasxusuario(localStorage.getItem('user_id')).subscribe({
      next: (response) => {
        console.log(response);
        this.reservas = response.reservas
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  cancelar(id:any){

    const confirmacion = confirm('¿Estás seguro de que deseas cancelar la reservación?');

    if (confirmacion) {
      // Lógica para actualizar
      this.auth.cancelar(id).subscribe({
        next: (response) => {
          console.log(response);
          this.reservasxusuario();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  logout(){
    this.auth.logout();
  }

}
