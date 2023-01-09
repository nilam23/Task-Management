import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// dependency injection of the TaskService as a provider into the TaskController
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    // extracting all the tasks
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    // extracting the status and the search parameter provided in the request
    const { status, search } = filterDto;

    // extracting all the tasks currently present
    let tasks = this.getAllTasks();

    // if status filter parameter exists
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // if search filter parameter exists
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    // extracting the task corresponding to the id provided
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    // extracting the titlte and the description from the request
    const { title, description } = createTaskDto;

    // creating a new Task object
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    // saving the newly created Task object
    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // fetching the task with the corresponding id
    const task = this.getTaskById(id);

    // updating the status of the above task
    task.status = status;

    return task;
  }

  deleteTask(id: string): void {
    // fetching and the removing the task with the corresponding id
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
