import { Component, OnInit } from '@angular/core';
import { collection, where, onSnapshot } from "firebase/firestore";
import { AngularFirestore, QueryFn } from "@angular/fire/compat/firestore"
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, public db: AngularFirestore) {}

  ngOnInit(): void {

  }

  public UpdateUser(name: string, image: string) {
    this.authService.UpdateUserData({ displayName: name, photoURL: image });
  }
}