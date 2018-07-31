import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userInfo: firebase.UserInfo;

  constructor(
    public navCtrl: NavController,
    public _authService: AuthServiceProvider
  ) {
    this.userInfo = _authService.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');    
  }

  salir() {
    this._authService.signOut()
          .then( () => this.navCtrl.setRoot('LoginPage'), 
                error => console.log(error.message)
    );
  }

}
