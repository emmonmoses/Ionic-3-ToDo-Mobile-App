import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ITask } from '../../interface/ITask';
import { TaskService } from '../../providers/dbservice';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage implements OnInit {

  FullName: string;
  Secret_Key: string;
  user: ITask;
  users: ITask[];
  counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskService: TaskService,
     public alertCtrl: AlertController, public toast: ToastController) {
    this.FullName = '';
    this.Secret_Key = '';
  }

  ngOnInit(): void {
    this.taskService.getUser()
      .subscribe(res => this.users = res);
  }

  changePassword(): void {
    if (this.FullName == '') {
      this.emptyAlert();
    }
    else {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].FullName == this.FullName) {
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
        this.changeSuccess(this.user);
        this.counter = 0;
        this.FullName = '';
        this.Secret_Key = '';
      }
    }
  }

  changeSuccess(user) {
    this.taskService.resetPassword(user)
      .subscribe((response) => {
        response
        this.showToast();
      });
  }

  showToast() {
    const toast = this.toast.create({
      message: 'Password changed',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  errorAlert() {
    const alert = this.alertCtrl.create({
      title: 'Ooops!Sorry!',
      subTitle: 'This username is incorrect',
      buttons: ['OK']
    });
    alert.present();
  }

  emptyAlert() {
    const alert = this.alertCtrl.create({
      title: 'Empty Field!',
      message: 'Username cannot be empty',
      buttons: ['OK']
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.setRoot(LoginPage);
  }

}
