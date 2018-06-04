import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { utilServices } from '../providers/util';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;// = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public utils:utilServices) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        this.utils.localGet("loginUser").then((user)=>{
          console.log(user);
            if(user == null){
              this.rootPage = LoginPage;
            }
            else{
              this.rootPage = ChatPage;
            }
        });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

