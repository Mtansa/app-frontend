import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../servicios/auth.service";
import {HabitacionesComponent} from "../habitaciones/habitaciones.component";


@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [
    NgIf,
    FormsModule, HabitacionesComponent, RouterLink
  ],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.css'
})
export class ReservarComponent {

  id_habitacion: any = '';
  precio_habitacion: any = '';

  nombre: any = '';
  email: any = '';
  telefono: any = '';
  tipo: any = '';
  numero: any = '';
  fechaEntrada: any = '';
  fechaSalida: any = '';

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {
  }


  ngOnInit(): void {

      //Ojo ruta protegida

    if(!this.auth.isAuthenticated() || this.auth.getPerfil()!=='usuario'){
      alert('Ruta protegida');
      this.router.navigate(['/login']);
      return
    }
      this.route.paramMap.subscribe(params => {
      this.precio_habitacion = (params.get('precio'));
      this.id_habitacion = (params.get('id'));
      this.tipo = (params.get('tipo'));
      this.numero = (params.get('numero'));

      this.email = localStorage.getItem('email');
      this.nombre = localStorage.getItem('nombre');
      this.telefono = localStorage.getItem('telefono');


    });
  }

  hacerReserva() {
    const data = {
      USER_ID: localStorage.getItem(('user_id')),
      ID_HAB: this.id_habitacion,
      FECHA_E: this.fechaEntrada,
      FECHA_S: this.fechaSalida,
      ESTADO: 'Reservada'
    }
    //if ( this.fechaEntrada > this.fechaSalida ) {
      this.auth.reservar(data).subscribe((response: any) => {
        if (response.status == 201) {
          alert('Reserva realizada correctamente.')
          this.router.navigate(['/habitaciones'])
          return;
        }
      });
    /*}else {
      alert('La fecha inicial debe ser menor que la final')
    }*/
  }

  verificarReserva() {
    const data = {
      ID_HAB: this.id_habitacion,
      FECHA_E: this.fechaEntrada,
      FECHA_S: this.fechaSalida,
    }
    this.auth.verificar(data).subscribe((response: any) => {
      if (response.status == 200) {
        //this.router.navigate(['/habitaciones'])
        this.hacerReserva();
        return;
      }
      if (response.status == 400) {
        alert("la habitacion esta reservada para ese rango de fecha");
        return;
      }

    });
  }

}
