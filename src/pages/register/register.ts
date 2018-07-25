import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController  } from 'ionic-angular';
import { TaskService } from '../../providers/dbservice';
import { LoginPage } from '../login/login';
import { ITask } from '../../interface/ITask';
import { Task } from '../../model/ITask.model';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage implements OnInit {

  users: ITask[];
  user: ITask;
  createdUser: ITask;
  FullName;
  Secret_Key;
  counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskService: TaskService, public alertCtrl: AlertController,
    public toast: ToastController, ) {
    this.user = new Task(); {
      this.user.FullName = '';
      this.user.Secret_Key = '';
    }
  }

  ionViewDidLoad() { }

  ngOnInit(): void {
    this.taskService.getUser()
      .subscribe(res => this.users = res);
  }

  redirectLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  getUsers() {
    this.taskService.getUser()
      .subscribe(data => {
        console.log(data);
      });
  }

  regSuccessful() {
    this.taskService.getUser()
      .subscribe(response => {
        this.users = response;
        for (let i = 0; i < this.users.length; i++) {
          if (this.user.FullName == this.users[i].FullName && this.user.Secret_Key == this.users[i].Secret_Key) {
            this.createdUser = this.users[i];
            this.navCtrl.setRoot(HomePage, {
              item: this.createdUser
            });
          }
        }
      });
  }

  onSubmit() {
    if (this.user.FullName == '' || this.user.Secret_Key == '') {
      this.emptyFieldAlert();
    }
    else {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].FullName == this.user.FullName) {
          this.counter++;
        }
      }
      if (this.counter == 0) {
        this.taskService.addUser(this.user)
          .subscribe(res => {
            console.log(res);
            this.regSuccessful();
          });
        this.showToast();
        this.counter = 0;
      }
      else {
        this.nameExistAlert();
        this.user.FullName = '';
        this.user.Secret_Key = '';
        this.counter = 0;
      }
    }
  }

  emptyFieldAlert() {
    const alert = this.alertCtrl.create({
      title: 'Ooops!Sorry!',
      message: 'The username and or password cannot be empty',
      buttons: ['OK']
    });
    alert.present();
  }

  nameExistAlert() {
    const alert = this.alertCtrl.create({
      title: 'Ooops!Sorry!',
      message: 'The username already Exists',
      buttons: ['OK']
    });
    alert.present();
  }

  showToast() {
    const toast = this.toast.create({
      message: 'Registration Successful',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
