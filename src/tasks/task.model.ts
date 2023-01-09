/* eslint-disable prettier/prettier */

// defining the model of a task that is to be stored
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// the value of the status of a task must be one of the following values
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
