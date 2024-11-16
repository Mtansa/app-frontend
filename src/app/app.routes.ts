import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegistrarComponent} from "./registrar/registrar.component";
import {HabitacionesComponent} from "./habitaciones/habitaciones.component";
import {ReservarComponent} from "./reservar/reservar.component";
import {PanelAdminComponent} from "./panel-admin/panel-admin.component";
import {Page404Component} from "./page-404/page-404.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {EditarUsuarioComponent} from "./editar-usuario/editar-usuario.component";
import {NuevoUsuarioComponent} from "./nuevo-usuario/nuevo-usuario.component";
import {NuevaHabitacionComponent} from "./nueva-habitacion/nueva-habitacion.component";
import {ListaHabitacionesComponent} from "./lista-habitaciones/lista-habitaciones.component";
import {EditarHabitacionComponent} from "./editar-habitacion/editar-habitacion.component";

export const routes: Routes = [

  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path:'registrar', component:RegistrarComponent},
  { path: 'page-404', component: Page404Component},
  {path: 'habitaciones', component:HabitacionesComponent},
  {path:'reservar/:precio/:id/:tipo/:numero', component:ReservarComponent},
  {path: 'panel-admin', component:PanelAdminComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path:'editar-usuario/:id/:nombre/:email/:telefono/:role', component:EditarUsuarioComponent},
  {path:'nuevo-usuario',component:NuevoUsuarioComponent},
  {path:'lista-habitaciones',component:ListaHabitacionesComponent},
  {path:'nueva-habitacion',component:NuevaHabitacionComponent},
  {path:'editar-habitacion/:id/:numero/:tipo/:descripcion/:precio/:estado',component:EditarHabitacionComponent},
  {path: '**', pathMatch: 'full', redirectTo:'page-404' }

];
