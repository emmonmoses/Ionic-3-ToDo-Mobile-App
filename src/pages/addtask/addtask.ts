import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TaskService } from '../../providers/dbservice';
import { HomePage } from '../home/home';
import { ITask } from '../../interface/ITask';
import { Task } from '../../model/ITask.model';

@IonicPage()
@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage implements OnInit {

  taskS: ITask[];
  task: ITask;
  isAdded = false;
  Task: string = '';
  Priority: string = '';
  user: ITask;

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskService: TaskService, public alertCtrl: AlertController, public toast: ToastController) {
    this.user = navParams.get('item');
  }

  ionViewDidLoad() { }

  ngOnInit() {
    this.task = new Task(); {
      this.task.UserID = this.user.ID
      this.task.Task = '';
      this.task.Priority = '';
    }
  }

  addTask() {
    if (this.task.Task == '') {
      this.emptyTaskAlert();
    } else if (this.task.Priority == '') {
      this.emptyPriorityAlert();
    } else {
      this.taskService.addTask(this.task)
        .subscribe((response) => {
         this.showToast();

        },
          (error: Response) => {
            this.errorAlert();
          });
    }
    this.task.Task = '';
    this.task.Priority = '';
  }

  successAlert() {
    const alert = this.alertCtrl.create({
      title: 'Success Message!',
      subTitle: 'Task added successfullly',
      buttons: ['OK']
    });
    alert.present();
  }

  errorAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error Message!',
      subTitle: 'Task not added',
      buttons: ['OK']
    });
    alert.present();
  }

  showToast() {
    const toast = this.toast.create({
      message: 'Task Added',
      duration: 3000,
      position: 'top'

    });
    toast.present();
  }

  emptyTaskAlert() {
    const alert = this.alertCtrl.create({
      message: 'Task field cannot be empty',
      buttons: ['OK']
    });
    alert.present();
  }

  emptyPriorityAlert() {
    const alert = this.alertCtrl.create({
      message: 'Please set the task priority',
      buttons: ['OK']
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.setRoot(HomePage, {
      item: this.user
    });
  }

}
