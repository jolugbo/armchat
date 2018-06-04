import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { RegisterPage } from '../register/register';
import { apiServices } from '../../providers/apiServices';
import {ChatPage} from '../chat/chat';
import {AngularFireAuth} from 'angularfire2/auth';
import { utilServices } from '../../providers/util';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData: any;
  loginData = {
    email: '',
    password: ''
  }
  userRecord = {
    id: '',
    email: '',
    default: '',
    firstname: '',
    agentid: '',
    token: ''
  }

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public navParams: NavParams, public apiServices: apiServices, private afAuth: AngularFireAuth,
    public utils: utilServices) {
    //   this.utils.localGet("login").then((result)=>{
    //     if(result == true){
    //       this.utils.localGet("loginUser").then((user)=>{
    //         if(result == true){
    //           this.navCtrl.setRoot(ChatPage, {
    //             username: user
    //           });
    //         }
    //     });
    //     }
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signIn() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email,this.loginData.password)
    .then((data)=>{
      console.log(this.afAuth.auth.currentUser);
      this.utils.presentAlert('Login Successful!', 'welcome ' + this.afAuth.auth.currentUser.email);
      this.utils.localSave('loginUser', this.afAuth.auth.currentUser.email);
      this.utils.localSave('login', true);
      this.navCtrl.setRoot(ChatPage, {
        username: this.afAuth.auth.currentUser.email
      });
    })
    .catch(error =>{
      console.log(error);
      this.utils.presentAlert('Login Failed!', error.message);
    });
    ;
 }

 Register(){
  this.navCtrl.setRoot(RegisterPage);
}

  generateToken() {
    let rd = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16).substring(1);
    }
    return rd() + rd() + '-' + rd() + '-' + rd() + '-' + rd() + '-' + rd() + rd() + rd()

  }

}
