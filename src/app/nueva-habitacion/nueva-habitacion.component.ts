import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../servicios/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-nueva-habitacion',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './nueva-habitacion.component.html',
  styleUrl: './nueva-habitacion.component.css'
})
export class NuevaHabitacionComponent {

  numero:any='';
  tipo:any='';
  descripcion:any='';
  precio:any='';
  estado:any='';
  constructor(private route: ActivatedRoute, private  auth: AuthService, private router:Router) {
  }

  ngOnInit(){

    if(!this.auth.isAuthenticated() || this.auth.getPerfil()!=='admin') {
      alert('Ruta protegido');
      this.auth.logout()
      this.router.navigate(['/login']);
      return
    }
    /*this.habitacionessall()
    this.nombre = this.auth.getNombre()
    this.perfil = this.auth.getPerfil()*/

  }


  agregarrHabitacion(){


    if(this.numero === '' || this.tipo  === '' || this.descripcion === '' ||  !this.tipo || !this.estado) {
      alert('Advertencia!, Todos los campos son obligatorios.!')
      return
    }

    const data = {
      numero: this.numero,
      tipo: this.tipo,
      descripcion: this.descripcion,
      precio: this.precio,
      estado: this.estado

    }
    this.auth.registrarHabitacion(data).subscribe((response: any) => {
      console.log(response);
      if( response.status == 201 ) {
        alert(response.msg)
        this.router.navigate(['/lista-habitaciones']);
      }
      if( response.status == 404 ) {
        alert(response.msg)
        return;
      }
    });
  }

}
