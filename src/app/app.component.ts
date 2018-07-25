import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

import { LoginPage } from '../pages/login/login';
/* import { AddtaskPage } from '../pages/addtask/addtask';
import { EditModalPage } from '../pages/edit-modal/edit-modal';
import { ITask } from '../interface/ITask'; */

@Component({
  templateUrl: 'app.html',
  /* providers: [NavParams] */
})
export class ToDoApp {

  /* @ViewChild(Nav)nav: Nav; */
  /* user: ITask; */
  rootPage: any = LoginPage;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe( () => this.showSplash = false)
    });

  /*   this.user = navParams.get('item');
    console.log(this.user); */

  }

  addtask() {
   /*  this.nav.setRoot(AddtaskPage, {
      item: this.user
    }); */
  }

  editProfile() {
  /*   this.nav.setRoot(EditModalPage); */
  }

  logOut() {
 /*    this.nav.setRoot(LoginPage); */
  }

}

