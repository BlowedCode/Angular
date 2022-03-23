import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import Swal from 'sweetalert2';

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
      if(e instanceof NavigationEnd) {
        if(this.LoggedIn && (this.LoggedIn != authService.isLoggedIn))
          Swal.fire({ 
            title: 'Disconnesso',
            text: "Sei stato disconnesso dall'Applicazione.",
            icon: 'warning',
            confirmButtonText: 'Chiudi',
            confirmButtonColor: '#FB8122'
          });

        this.LoggedIn = authService.isLoggedIn;
      }
    });
  }
}
