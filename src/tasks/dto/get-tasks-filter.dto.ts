/* eslint-disable prettier/prettier */
import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

// defining the properties that may be used while fetching the tasks
export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
  
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
