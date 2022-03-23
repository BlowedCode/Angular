import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BlowedcodeWeb';

  public LoggedIn: boolean = false;

  constructor(router: Router, authService: AuthService) {
    router.events.subscribe((e) => {
      if(e instanceof NavigationEnd)
        this.LoggedIn = authService.isLoggedIn;
    });
  }
}
