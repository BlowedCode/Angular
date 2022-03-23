import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthService {
  RESET_PASSWORD_SENT: string = "Richiesta eseguita con successo! Controlla la tua email registrata per recuperare la password.";
  userData: any; // Save logged in user data

  constructor(
    public db: AngularFirestore, // Inject Firestore service
    public fireAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
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
      }).catch((error) => {
        // Gestione errore di Login
        this.FireError(error.message);
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
        this.FireError(error.message);
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
        this.FireWarning(this.RESET_PASSWORD_SENT);
      }).catch((error) => {
        this.FireError(error);
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
        this.FireError(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const userData: User = {
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

  // Sign out
  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  // Error Fired
  private FireError(msg: string) {
    Swal.fire({   
      title: 'Errore',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Chiudi',
      confirmButtonColor: '#FB8122'
    });
  }

  private FireWarning(msg: string) {
    Swal.fire({   
      title: 'Richiesta di Conferma',
      text: msg,
      icon: 'warning',
      confirmButtonText: 'Chiudi',
      confirmButtonColor: '#FB8122'
    });
  }
}