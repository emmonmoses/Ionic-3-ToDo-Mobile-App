import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ITask } from '../../interface/ITask';
import { Task } from '../../model/ITask.model';
import { TaskService } from '../../providers/dbservice';

@IonicPage()
@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
})

export class EditModalPage implements OnInit {

  updatedTask: ITask;
  Status: boolean;
  task: ITask;
  user: ITask;

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskService: TaskService,
    public alertCtrl: AlertController, public toast: ToastController) {

    this.user = navParams.get('item');
    this.task = navParams.get('item2');
    this.updatedTask = new Task(); {
      this.updatedTask.UserID = this.user.ID;
      this.updatedTask.Task = '';
      this.updatedTask.Priority = '';
      this.updatedTask.Status = true;
    }

  }

  ionViewDidLoad() { }

  ngOnInit(): void {
    this.updatedTask.UserID = this.task.UserID;
    this.updatedTask.Task = this.task.Task;
    this.updatedTask.Priority = this.task.Priority;
    this.updatedTask.Status = this.task.Status;
    this.updatedTask.ID = this.task.ID;
  }

  errorAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error Message!',
      subTitle: 'Task not updated',
      buttons: ['OK']
    });
    alert.present();
  }

  successAlert() {
    const alert = this.alertCtrl.create({
      title: 'Update Message!',
      subTitle: 'Task Updated successfullly',
      buttons: ['OK']
    });
    alert.present();
  }

  editTask() {
    this.taskService.updateTask(this.updatedTask)
      .subscribe((response) => {
        /* this.successAlert(); */
        this.showToast();
        this.goHome();
      },
        (error: Response) => {
          this.errorAlert();
        });
    this.updatedTask.Task = '';
    this.updatedTask.Priority = '';
    this.updatedTask.Status;
  }

  showToast() {
    const toast = this.toast.create({
      message: 'Edit Successful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  goHome() {
    this.navCtrl.setRoot(HomePage, {
      item: this.user
    });
  }

}
