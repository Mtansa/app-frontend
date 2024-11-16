import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../servicios/auth.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
    imports: [
        RouterLink,LoginComponent
    ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  nombre:any = "";
  perfil:any= "";
  usuarios:any=[];
  auth = inject(AuthService)
  router = inject(Router)

  ngOnInit(){

    if(!this.auth.isAuthenticated() || this.auth.getPerfil()!=='admin') {
      alert('Ruta protegido');
      this.auth.logout()
      this.router.navigate(['/login']);
      return
    }
    this.usuariosall()
    this.nombre = this.auth.getNombre()
    this.perfil = this.auth.getPerfil()

  }

  usuariosall(){
    console.log('entro')
    this.auth.usuarios().subscribe({
      next: (response) => {
        console.log(response);
        this.usuarios = response
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  eliminarusuario(id:any){

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar el usuario?');

    if (confirmacion) {
      // Lógica para actualizar
      this.auth.eliminaUsuarios(id).subscribe({
        next: (response) => {
          console.log(response);
          this.usuariosall();
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
