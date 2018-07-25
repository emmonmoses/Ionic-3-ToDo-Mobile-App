import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { TaskService } from '../../providers/dbservice';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ITask } from '../../interface/ITask';
import { PasswordresetPage } from '../passwordreset/passwordreset';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  FullName: string;
  Secret_Key: string;
  user: ITask;
  users: ITask[];
  counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskService: TaskService, public alertCtrl: AlertController) {
    this.FullName = '';
    this.Secret_Key = '';
  }

  ionViewDidLoad() { }

  ngOnInit(): void {
    this.taskService.getUser()
      .subscribe(res => this.users = res);
  }

  onLogin() {
    if (this.FullName == '' || this.Secret_Key == '') {
      this.emptyAlert();
    }
    else {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].FullName == this.FullName && this.users[i].Secret_Key == this.Secret_Key) {
          this.counter++;
          this.user = this.users[i];
        }
      }
      if (this.counter == 0) {
        this.errorAlert();
        this.FullName = '';
        this.Secret_Key = '';
      }
      else {
        this.loginSuccess(this.user);
        this.counter = 0;
        this.FullName = '';
        this.Secret_Key = '';
      }
    }
  }

  loginSuccess(obj) {
    this.navCtrl.setRoot(HomePage, {
      item: obj
    });
  }

  errorAlert() {
    const alert = this.alertCtrl.create({
      title: 'Ooops!Sorry!',
      subTitle: 'The username and or password is incorrect',
      buttons: ['OK']
    });
    alert.present();
  }

  emptyAlert() {
    const alert = this.alertCtrl.create({
      title: 'Ooops!Sorry!',
      message: 'Username and or password cannot be empty',
      buttons: ['OK']
    });
    alert.present();
  }

  loadRegister() {
    this.navCtrl.setRoot(RegisterPage);
  }

  passwordReset() {
    this.navCtrl.push(PasswordresetPage);
  }
}
