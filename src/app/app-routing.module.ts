import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, ForgotPasswordComponent, SignInComponent, SignUpComponent, VerifyEmailComponent } from './components';
import { AuthGuard } from './shared/guard/auth.guard';
import { UnauthGuard } from './shared/guard/unauth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [UnauthGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [UnauthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [UnauthGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: "reload", relativeLinkResolution: "legacy" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }