import { Component, OnInit } from '@angular/core';
import { IUserData } from '../models';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private db: FirebaseService) { }

  ngOnInit() {

  }

  testRegister() {
    this.db.RegisterUser();
  }

  testLogin() {
    this.db.GetUsers().subscribe(res => {
      console.log(res);
    })
  }

  testDatabase() {
    let dto: IUserData = { username: "admin", password: "admin123", email: "blowedcode@gmail.com", dtregister: new Date(), dtlastlogin: new Date() };
    this.db.UpdatePassword("IYJBB0bVp14BQzFHZter", dto).then(res => {
      console.log("Update Successful.");
    }, err => {
      console.log(err);
    });

    // this.db.DeleteUser("IYJBB0bVp14BQzFHZter").then(x => { 
    //   this.db.GetUsers().subscribe(res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   })
    // });
  }
}
