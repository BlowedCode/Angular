import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BlowedcodeWeb';
  public Navbar: { title: string } = { title: "Applicazione" };

  constructor() {}
}
