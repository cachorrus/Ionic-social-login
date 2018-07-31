import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthServiceProvider {

  private user: firebase.User;

  constructor(public http: HttpClient,
		public afAuth: AngularFireAuth,
		private fb: Facebook,
		private googlePlus: GooglePlus,
		private platform: Platform
  ) {
    console.log('Hello AuthServiceProvider Provider');
    afAuth.authState.subscribe(user => {
			this.user = user;
		});
  }

  get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	getUserInfo() {
		return this.user && this.user.providerData[0];
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

  signInWithGoogle(): any {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider).then( res => console.log(res));
		} else {
			return this.googlePlus.login({
				'webClientId': '2159352182-0d8klbsgbajpghrdkj47t36jfslmlhht.apps.googleusercontent.com',
				'offline': true
			}).then( res => {

				return this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      			.then( success => {
        				console.log("Firebase success: " + JSON.stringify(success));
      			})
			}).catch(err => console.error(err));
			// return this.afAuth.auth.signInWithRedirect(provider)
			// .then(() => {
			// 	return this.afAuth.auth.getRedirectResult().then( result => {
			// 		// This gives you a Google Access Token.
      //     // You can use it to access the Google API.
      //     // https://medium.com/@srbhgpt123/i-am-getting-error-on-accesstoken-while-what-to-do-127979dd494b
      //     console.log(result.credential);
			// 		// let token = result.credential.accessToken;
			// 		// The signed-in user info.
			// 		let user = result.user;
			// 		console.log(user);
			// 	}).catch(function(error) {
			// 		// Handle Errors here.
			// 		console.log(error.message);
			// 	});
			// });
		}
	}

	signInWithFacebook(): any {
		console.log('Sign in with facebook');
		
		if (this.platform.is('cordova')) {
			
			return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    } else {

		//return this.oauthSignIn( new firebase.auth.FacebookAuthProvider());
		return this.afAuth.auth
								.signInWithPopup(new firebase.auth.FacebookAuthProvider())
								.then( res => console.log(res));
		}
		
  }

}
