import { collection, getDocs, doc, getDoc, getFirestore, query, where } from "firebase/firestore";
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserData } from 'src/app/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private db: any;
  public Users: UserData[];

  constructor() { }

  ngOnInit(): void {
    this.db = getFirestore();

    this.updateTable();
  }

  public updateTable() {
    this.getData().then(t => {
      this.Users = t;
    });
  }

  async getData(): Promise<UserData[]> {
    let toRet: UserData[] = [];

    let q = query(collection(this.db, "users"));
    let querySnap = await getDocs(q);

    querySnap.forEach((doc) => {
      toRet.push(doc.data() as UserData);
      console.log(doc.data());
    });

    // if(docSnap.docs?.length > 0) console.log("Collection data: ", docSnap.docs);
    // else console.log("No such document");

    return toRet;
  }
}