import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';
import { Subject } from 'rxjs/Subject';
import { ITask } from '../interface/ITask';

@Injectable()

export class TaskService {

  subject = new Subject<any>();
  tasks: ITask[];
  user: ITask[];
  credential: ITask[];

  public _url: any = 'http://192.168.0.108/taskapi/api/task/';
  public account_url: any = 'http://192.168.0.108/taskapi/api/user/';
  public login_url: any = 'http://192.168.0.108/taskapi/api/login/';

  constructor(public http: Http) { }

  broadcastTask(task: ITask): void {
    this.subject.next(task);
  }

  subscribeTask(): Observable<any> {
    return this.subject.asObservable();
  }

  login(user: string) {
    const body = { user: user };
    return this.http.post(this.login_url, body)
      .map(result => result.json());
  }

  resetPassword(user: ITask) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, body: body });
    return this.http.put(this.account_url, body, options)
      .map((response: Response) => response);
  }

  getTasks(): Observable<ITask[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this._url, options)
      .map((response: Response) => <ITask[]>response.json());
  }

  getFilteredTasks(searchText: string): Observable<ITask[]> {
    return Observable.create(observable => {
      this.getTasks().subscribe(allTasks => {
        if (searchText && searchText.length > 0) {
          let filteredTasks = allTasks
            .filter(t => t.Task.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
              t.Task.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
          observable.next(filteredTasks);
        }
        else {
          observable.next(allTasks);
        } observable.complete();
      });
    });
  }

  addTask(task: any): Observable<ITask> {
    const body = JSON.stringify(task);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, body: body });
    return this.http.post(this._url, body, options)
      .map((response) => <ITask>response.json());
  }

  updateTask(task: ITask) {
    const body = JSON.stringify(task);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, body: body });
    return this.http.put(this._url, body, options)
      .map((response: Response) => response);
  }

  deleteTask(task: ITask) {
    return this.http.delete(this._url, { body: task })
      .map((response => response));
  }

  getUser(): Observable<ITask[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.account_url, options)
      .map((response: Response) => <ITask[]>response.json());
  }

  addUser(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.account_url, body, options)
      .map((res: Response) => { return res.json().status });
  }

}
