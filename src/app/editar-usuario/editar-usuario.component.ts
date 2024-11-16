import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../servicios/auth.service";

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

  id:any='';
  nombre:any='';
  email:any='';
  telefono:any='';
  role:string | null='';

  constructor(private route: ActivatedRoute, private  auth: AuthService, private router:Router) {
  }

  ngOnInit(){

      this.route.paramMap.subscribe(params => {
      this.id    = (params.get('id'));
      this.nombre = (params.get('nombre'));
      this.email = (params.get('email'));
      this.telefono = (params.get('telefono'));
      this.role = (params.get('role'));

    });
  }

  actualizarUsuarios(id:any) {
    const usuarioId = id; // ID del usuario que quieres actualizar
    const datos:any = {
      nombre   : this.nombre,
      telefono : this.telefono,
      role      : this.role
    };
    this.auth.actualizarUsuarios(usuarioId, datos)
      .subscribe((response: any) => {
      console.log(response);
      if( response.status == 200 ) {
        alert(response.msg)
        this.router.navigate(['/usuarios']);
      }
    });
  }




}
