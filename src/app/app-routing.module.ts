import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';

const routes: Routes = [
	 { path: 'Dashboard',      component: DashboardComponent },
	 { path: 'Updateuser',      component: UpdateuserComponent },
    { path: 'CreateUser',      component: RegistrationComponent },
	{ path: 'login', component: LoginComponent,  data: { title: 'LOGIN' } },
    { path: '**', component: LoginComponent }

    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
