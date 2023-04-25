import { IsNotEmpty } from 'class-validator';

// a task must have the following properties during the time of creation
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  description: string;
}
