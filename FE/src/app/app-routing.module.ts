import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AppGuard } from './app.guard'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', canActivate: [AppGuard], component: HomeComponent },
  { path: '', canActivate: [AppGuard], component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
