import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './helpers/task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // adding logger
  private logger = new Logger('TaskController');

  // TaskService is a provider in the TaskModule
  // which has been injected in the TaskController via the @Injectable() decorator
  constructor(private tasksService: TasksService) {}

  /**
   * @description
   * the controller method to fetch either all tasks or tasks based on query params
   * @param {GetTasksFilterDto} filterDto the request query params
   * @returns tasks fetched from database
   */
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(`${user.username} retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);

    return this.tasksService.getTasks(filterDto, user);
  }

  /**
   * @description
   * the controller method to fetch task by its corresponding id
   * @param {number} id the id of the task to be fetched from database
   * @returns the task corresponding to the id
   */
  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`${user.username} retrieving a task with the id ${id}`);

    return this.tasksService.getTaskById(id, user);
  }

  /**
   * @description
   * the controller method to create a new task and save it in the database
   * @param {CreateTaskDto} createTaskDto the request body params
   * @returns the newly created task
   */
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`${user.username} creating a new task. Data: ${JSON.stringify(createTaskDto)}`);

    return this.tasksService.createTask(createTaskDto, user);
  }

  /**
   * @description
   * the controller method to update the status of an existing task
   * @param {number} id the id of the task to be updated
   * @param {TaskStatus} status the new status of the task
   * @returns the updated task
   */
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(`${user.username} updating a task corresponding to the id ${id} with the status '${status}'`);

    return this.tasksService.updateTaskStatus(id, status, user);
  }

  /**
   * @description
   * the controller method to delete an existing task
   * @param {number} id the id of the task to be deleted
   * @returns
   */
  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(`${user.username} deleting a task with id ${id}`);

    return this.tasksService.deleteTask(id, user);
  }
}
