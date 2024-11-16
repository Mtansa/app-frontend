import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../servicios/auth.service";

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {

  nombre:any = '';
  email:any = '';
  telefono:any = '';
  password:any = '';
  rol:any='';


  auth    = inject(AuthService)
  router  = inject(Router)
  registrar(){


    if(this.email === '' || this.nombre === '' || this.password === '' || this.telefono === '' || !this.rol) {
      alert('Advertencia!, Todos los campos son obligatorios.!')
      return
    }

    const data = {
      email    : this.email,
      nombre   : this.nombre,
      telefono : this.telefono,
      password : this.password,
      role     : this.rol

    }
    this.auth.registrar(data).subscribe((response: any) => {
      console.log(response);
      if( response.status == 200 ) {
        alert(response.msg)
        this.router.navigate(['/usuarios']);
      }
      if( response.status == 404 ) {
        alert(response.msg)
        return;
      }
    });
  }

}
