import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BlowedcodeWeb';
  public Navbar: { title: string } = { title: "Applicazione" };

  constructor(private router: Router, private str: StorageService) {}

  ngOnInit() {
    console.log("Applicazione caricata con successo.")
    console.log("Controllo se esiste token di Log-in...")

    let s = this.str.read("USER_TOKEN");
    console.log(s);

    if(!s) {
      console.log("Il Token non esisteva e lo creo falso per proseguire.")
      this.router.navigate(["/login"]);
      this.str.store("USER_TOKEN", "fakedatatoken");
    }
  }
}
