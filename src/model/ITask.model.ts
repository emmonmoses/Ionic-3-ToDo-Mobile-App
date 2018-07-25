import { ITask } from '../interface/ITask';

export class Task implements ITask {
  ID: number;
  Task: string;
  Status: boolean;
  Priority: string;
  FullName: string;
  Secret_Key: string;
  UserID: number;

}
