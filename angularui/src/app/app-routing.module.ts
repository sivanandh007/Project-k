import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGaurd } from './gaurds/auth.guard';
import { MoviesComponent } from './components/movies/movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  {path:'login',component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[authGaurd]},
  { path: 'movies/:cityID', component: MoviesComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
