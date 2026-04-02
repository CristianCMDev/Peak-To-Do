import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private platform: Platform,
    private gplus: GooglePlus,
    private afAuth: AngularFireAuth
  ) {}

  loginWithGoogle() {
    if (this.platform.is('cordova')) {
      return this.gplus.login({
        webClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com',
        offline: true
      }).then(user => {
        const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
        return this.afAuth.signInWithCredential(credential);
      });
    } else {
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  logout() {
    if (this.platform.is('cordova')) {
      return this.gplus.logout().then(() => this.afAuth.signOut());
    } else {
      return this.afAuth.signOut();
    }
  }

  getUser() {
    return this.afAuth.authState;
  }
}