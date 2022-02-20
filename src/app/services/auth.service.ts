import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // DA CASSARE TUTTO, DEPRECATO DA FIREBASE.SERVICE
  private DB: string = "https://blowed-code-default-rtdb.europe-west1.firebasedatabase.app/database/";
  private USERS_TABLE: string = "users.json";

  constructor(private http: HttpClient) { }

  public Register(data: { user: string, password: string }): any {
    this.http.post(this.DB + this.USERS_TABLE, data).subscribe(res => {
      console.log(res);
      return res;
    });
  }

  public UpdatePassword(data: { password: string }): any {
    this.http.put(this.DB + this.USERS_TABLE, data)
  }

  public GetUsers(): any {
    this.http.get(this.DB + this.USERS_TABLE).subscribe(res => {
      console.log(res);
      return res;
    });
  }
}