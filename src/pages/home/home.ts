import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, ToastController, NavParams, ActionSheetController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TaskService } from '../../providers/dbservice';
import { ITask } from '../../interface/ITask';
import { LoginPage } from '../login/login';
import { AddtaskPage } from '../addtask/addtask';
import { EditModalPage } from '../edit-modal/edit-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage implements OnInit, OnDestroy {

  task: string = 'all';
  taskS: ITask[];
  subscription: Subscription;
  Status: boolean;
  user: ITask;
  newUser: ITask;
  updatedStatus: ITask;
  searchText: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskService: TaskService, public alertCtrl: AlertController,
    public modalCtrl: ModalController, public toast: ToastController, public actSheetCtrl: ActionSheetController) {

    this.subscription = this.taskService.subscribeTask()
      .subscribe(task => {
        this.taskS.push(task);
      });

    this.user = navParams.get('item');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe((resTaskData) => this.taskS = resTaskData);
  }

  searchTask() {
    this.taskService.getFilteredTasks(this.searchText)
      .subscribe(filteredTasks => {
        this.taskS = filteredTasks
      });

  }

  presentActionSheet(task) {
    const actionSheet = this.actSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            const modal = this.modalCtrl.create(EditModalPage, {
              item: this.user,
              item2: task
            });
            modal.present();
          }
        }, {
          text: 'Delete',
          handler: () => {
            const confirm = this.alertCtrl.create({
              title: 'Confirm Delete?',
              message: 'This will permanently remove the record from the list.Proceed?',
              buttons: [
                {
                  text: 'No',
                  handler: () => {
                    /* console.log('Disagree clicked'); */
                  }
                },
                {
                  text: 'Yes',
                  handler: () => {
                    this.taskService.deleteTask(task)
                      .subscribe(res => {
                        const index: number = this.taskS.indexOf(task);
                        if (index !== -1) {
                          this.taskS.splice(index, 1);
                        }
                        this.deleteToast();
                      }, err => console.log(err));
                  }
                }
              ]
            });
            confirm.present();
          }
        }
      ]
    });
    actionSheet.present();
  }

  editModal(task) {
    const modal = this.modalCtrl.create(EditModalPage, {
      item: this.user,
      item2: task
    });
    modal.present();
  }

  updateStatus(obj: ITask): void {
    obj.Status = !obj.Status;
    this.taskService.updateTask(obj)
      .subscribe(res => {
        obj.Status = !obj.Status;
        this.statusToast();
      }, err => {
        err;
      });
      this.statusToast();
  }

  deleteConfirm(task: ITask) {
    const confirm = this.alertCtrl.create({
      title: 'Confirm Delete?',
      message: 'This will permanently remove the record from the list.Proceed?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            /* console.log('Disagree clicked'); */
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.taskService.deleteTask(task)
              .subscribe(res => {
                const index: number = this.taskS.indexOf(task);
                if (index !== -1) {
                  this.taskS.splice(index, 1);
                }
                this.deleteToast();
              }, err => console.log(err));
          }
        }
      ]
    });
    confirm.present();
  }

  successAlert() {
    const alert = this.alertCtrl.create({
      title: 'Success Message!',
      subTitle: 'Task deleted successfullly',
      buttons: ['OK']
    });
    alert.present();
  }

  logOut() {
    const confirm = this.alertCtrl.create({
      title: 'Sign Out?',
      message: 'This will log you out of the app.Proceed?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            /* console.log('Disagree clicked'); */
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
            this.signOutToast();
          }
        }
      ]
    });
    confirm.present();

  }

  statusToast() {
    const toast = this.toast.create({
      message: 'Status Updated',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  signOutToast() {
    const toast = this.toast.create({
      message: 'Sign Out Successful',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  deleteToast() {
    const toast = this.toast.create({
      message: 'Deleted Successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  addtask() {
    this.navCtrl.push(AddtaskPage, {
      item: this.user
    });
  }

}
