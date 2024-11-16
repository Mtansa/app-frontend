import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../servicios/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registrar',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {

  nombre:any = '';
  email:any = '';
  telefono:any = '';
  password:any = '';
  rol:any = 'usuario';

  auth    = inject(AuthService)
  router  = inject(Router)
  registrar(){

    if(this.email === '' || this.nombre === '' || this.password === '' || this.telefono === '' ) {
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
        this.router.navigate(['/login']);
      }
      if( response.status == 404 ) {
        alert(response.msg)
        return;
      }
    });
  }



}
