import { Injectable, NgZone } from '@angular/core';
import { AuthError, IUserData } from '../models';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { SwalService } from './swal.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  RESET_PASSWORD_SENT: string = "Richiesta eseguita con successo! Controlla la tua email registrata per recuperare la password.";
  userData: any; // Save logged in user data

  constructor(
    public db: AngularFirestore, // Inject Firestore service
    public fireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public swalService: SwalService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((result) => {
        this.ngZone.run(() => { this.router.navigate(['dashboard']); });
        this.SetUserData(result.user);
      }).catch((error: AuthError) => {
        // Gestione errore di Login
        this.swalService.ShowError("Errore", this.ReadError(error));
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        // Gestione errore di Register
        this.swalService.ShowError("Errore", this.ReadError(error));
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.fireAuth.currentUser.then((u: any) => u.sendEmailVerification()).then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.fireAuth.sendPasswordResetEmail(passwordResetEmail).then(() => {
        this.swalService.ShowWarning("Richiesta di Conferma", this.RESET_PASSWORD_SENT);
      }).catch((error) => {
        this.swalService.ShowError("Errore", this.ReadError(error));
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user != null ? true : false; // Se volessi anche forzare che la mail sia verificata: && user.emailVerified != false
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) { this.router.navigate(['dashboard']); }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.fireAuth.signInWithPopup(provider).then((result) => {
        this.ngZone.run(() => { this.router.navigate(['dashboard']); });
        this.SetUserData(result.user);
      }).catch((error) => {
        this.swalService.ShowError("Errore", this.ReadError(error));
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    console.log("x");
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const userData: IUserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    JSON.parse(localStorage.getItem('user')!);
    return userRef.set(userData, { merge: true });
  }

  /*Update User Profile which is composed by DisplayName and PhotoURL*/
  UpdateUserData(data: { displayName?: string, photoURL?: string }) {
    this.fireAuth.currentUser.then((user) => {
      user?.updateProfile(data).catch((error) => {
        this.swalService.ShowError("Errore", this.ReadError(error));
      });
      this.SetUserData(user);
    });
  }

  // Sign out
  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  // Error Fired
  private errorDictionary: { [id: string]: string } = {
     "auth/invalid-email": "L'Indirizzo Email specificato non è valido." 
  };

  private ReadError(e: AuthError) {
    if(!this.errorDictionary[e.code])
      return e.message;

    return this.errorDictionary[e.code];
  }
}