/* eslint-disable prettier/prettier */
import { TaskStatus } from '../task.model';

// defining the properties that may be used while fetching the tasks
export class GetTasksFilterDto {
  status: TaskStatus;
  search: string;
}
