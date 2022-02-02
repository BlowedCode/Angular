import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public Items: string[] = [];

  constructor() { }

  ngOnInit() {
    for(var x = 0; x < 100; x++) this.Items.push(x.toString());
  }
}
