import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../servicios/auth.service";

@Component({
  selector: 'app-editar-habitacion',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar-habitacion.component.html',
  styleUrl: './editar-habitacion.component.css'
})
export class EditarHabitacionComponent {

  id:any='';
  numero:any='';
  tipo:any='';
  descripcion:any='';
  precio:any='';
  estado:any='';
  constructor(private route: ActivatedRoute, private  auth: AuthService, private router:Router) {
  }

  ngOnInit(){

      this.route.paramMap.subscribe(params => {
      this.id    = (params.get('id'));
      this.numero = (params.get('numero'));
      this.tipo = (params.get('tipo'));
      this.descripcion = (params.get('descripcion'));
      this.precio = (params.get('precio'));
      this.estado = (params.get('estado'));
    });
  }

  actualizarHabitacion(id:any) {
    const habitacionId = id; // ID del usuario que quieres actualizar
    const datos:any = {
      numero   : this.numero,
      tipo : this.tipo,
      descripcion      : this.descripcion,
      precio: this.precio,
      estado: this.estado
    };
    this.auth.actualizarHabitacion(habitacionId, datos)
      .subscribe((response: any) => {
        console.log(response);
        if( response.status == 200 ) {
          alert(response.msg)
          this.router.navigate(['/lista-habitaciones']);
        }
      });
  }

}
