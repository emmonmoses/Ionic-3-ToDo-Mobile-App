import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TaskService } from '../providers/dbservice';

import { ToDoApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { PasswordresetPage } from '../pages/passwordreset/passwordreset';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { AddtaskPage } from '../pages/addtask/addtask';
import { EditModalPage } from '../pages/edit-modal/edit-modal';



@NgModule({
  declarations: [
    ToDoApp,
    LoginPage,
    PasswordresetPage,
    RegisterPage,
    HomePage,
    AddtaskPage,
    EditModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ToDoApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    FormsModule,
    CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ToDoApp,
    LoginPage,
    PasswordresetPage,
    RegisterPage,
    HomePage,
    AddtaskPage,
    EditModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    TaskService
  ]
})
export class AppModule { }
