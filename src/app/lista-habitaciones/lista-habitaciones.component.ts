import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../servicios/auth.service";

@Component({
  selector: 'app-lista-habitaciones',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './lista-habitaciones.component.html',
  styleUrl: './lista-habitaciones.component.css'
})
export class ListaHabitacionesComponent {

  nombre:any = "";
  perfil:any= "";
  hab:any=[];
  auth = inject(AuthService)
  router = inject(Router)

  ngOnInit(){

    if(!this.auth.isAuthenticated() || this.auth.getPerfil()!=='admin') {
      alert('Ruta protegido');
      this.auth.logout()
      this.router.navigate(['/login']);
      return
    }
    this.habitacionessall()
    this.nombre = this.auth.getNombre()
    this.perfil = this.auth.getPerfil()

  }
  habitacionessall(){
    console.log('entro')
    this.auth.habitacionesall().subscribe({
      next: (response) => {
        console.log(response);
        this.hab = response
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  logout(){
    this.auth.logout();
  }

  eliminarHabitacion(id:any){

  }
}
