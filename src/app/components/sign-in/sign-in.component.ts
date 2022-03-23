import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService) { }
  
  ngOnInit() { }

  SignIn(User: string, Password: string) {
    this.authService.SignIn(User, Password);
  }

  GoogleSignIn() {
    this.authService.GoogleAuth();
  }
}