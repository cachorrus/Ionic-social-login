import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _authService: AuthServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithGoogle() {
    this._authService.signInWithGoogle()
      .then( () => this.navCtrl.setRoot(HomePage), 
        error => console.log(error.message)
    );
  }

  loginWithFacebook() {
    this._authService.signInWithFacebook()
      .then( () => this.navCtrl.setRoot(HomePage), 
        error => console.log(error.message)
    );
  }

}
