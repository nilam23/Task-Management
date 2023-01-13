import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

// dependency injection of the TaskService as a provider into the TaskController
@Injectable()
export class TasksService {
  // injecting the Task Repository into the service
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    // extracting out the status and the search params
    const { status, search } = filterDto;

    // implementing the query builder
    const query = this.taskRepository.createQueryBuilder('task');

    // if tasks to be fetched based on some status value
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    // if tasks to be fetched based on some search keyword
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}` },
      );
    }

    // fetching the tasks from the database
    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    // extracting the task corresponding to the id provided
    const task = await this.taskRepository.findOneBy({ id });

    // if no task exists with the corresponding id
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // extracting the titlte and the description from the request
    const { title, description } = createTaskDto;

    // creating the task
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    // saving the task into the database
    const result = await task.save();

    return result;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    // fetching the task with the given id
    const task = await this.getTaskById(id);

    // updating the status of the task
    task.status = status;

    // saving the updated task into the database
    await task.save();

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    // deleting the task with the given id, if exists
    const result = await this.taskRepository.delete(id);

    // else throwing an Not Found exception
    if (!result.affected)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }
}
