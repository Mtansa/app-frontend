import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../servicios/auth.service";

@Component({
  selector: 'app-panel-admin',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css'
})
export class PanelAdminComponent {

  auth=inject(AuthService)
  router = inject(Router)
  nombre:any = '';
  perfil:any= '';
  reservas:any=[];
  ngOnInit(){

    if(!this.auth.isAuthenticated() || this.auth.getPerfil()!=='admin') {
      alert('Ruta protegido');
      this.auth.logout()
      this.router.navigate(['/login']);
      return
    }
    this.nombre = this.auth.getNombre()
    this.perfil = this.auth.getPerfil();
    this.reservasall()


  }

  cancelar(id:any){

    const confirmacion = confirm('¿Estás seguro de que deseas cancelar la reservación?');

    if (confirmacion) {
      // Lógica para actualizar
      this.auth.cancelar(id).subscribe({
        next: (response) => {
          console.log(response);
          this.reservasall();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


  reservasall(){
    console.log('entro')
    this.auth.reservasall().subscribe({
      next: (response) => {
        console.log(response);
        this.reservas = response
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  confirmareserva(id:any){
    const data = { estado: 'confirmada' }; // Datos a actualizar

    this.auth.confirmareserva(id, data).subscribe(
      (response) => {
        if(response.status == 200){alert(response.msg)}
        this.reservasall()
      },
      (error) => {
        console.error('Error en la actualización:', error);
      }
    );
  }
  logout(){

    this.auth.logout();

  }
}
