import { Component } from '@angular/core';
import {AuthService} from "../servicios/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {PanelAdminComponent} from "../panel-admin/panel-admin.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink, PanelAdminComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  perfil: any = '';

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(){

    if(this.authService.isAuthenticated()){
      this.perfil = localStorage.getItem('perfil');
      if(this.perfil === 'admin'){
        this.router.navigate(['/panel-admin']);
        return
      }

      if(this.perfil === 'usuario'){
        this.router.navigate(['/dashboard']);
      }



    }
  }
  onLogin() {

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status==404){ alert('Credenciales invalidas')}
        if (response.status==200){
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombre',response.nombre);
        localStorage.setItem('telefono',response.telefono);
        localStorage.setItem('email',response.email)
        localStorage.setItem('user_id',response.id);
        localStorage.setItem('perfil',response.perfil);
        this.perfil = localStorage.getItem('perfil');
        //Aca valido el rol
        //y lo redirecciono a la pagina segun el perfil

        if (this.perfil === 'admin'){
           this.router.navigate(['/panel-admin']);
        }
        if (this.perfil ==='usuario'){
          this.router.navigate(['/dashboard']);
        }
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }


}
