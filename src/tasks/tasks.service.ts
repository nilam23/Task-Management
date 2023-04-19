import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './helpers/task-status.enum';

// dependency injection of the TaskService as a provider into the TaskController
@Injectable()
export class TasksService {
  // injecting the Task Repository into the service
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  /**
   * @description
   * this service method fetches tasks from database using query builder operation
   * @param {GetTasksFilterDto} filterDto the request query params received in controller level
   * @returns tasks fetched from the database
   */
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    try {
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

      const tasks = await query.getMany();

      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * @description
   * this service method fetches a task from database corresponding to its id
   * @param {number} id the id of the task to be fetched from database
   * @returns the task with the corresponding id
   */
  async getTaskById(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOneBy({ id });

      if (!task) throw new NotFoundException(`Task with ID ${id} not found`);

      return task;
    } catch (error) {
      if (error?.response?.statusCode === 404) throw new NotFoundException(error?.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * @description
   * this service method creates a new task and saves it in the database
   * @param {CreateTaskDto} createTaskDto request body params received in controller level
   * @returns the newly created task
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { title, description } = createTaskDto;

      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;

      const result = await task.save();

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * @description
   * this service method finds a task by its id and then updates the status of the same
   * @param {number} id the id of the task to be updated
   * @param {TaskStatus} status the new status of the task to be updated
   * @returns the updated task
   */
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    try {
      const task = await this.getTaskById(id);

      if (task.status !== status) { // the incoming status has to be different from the current status of the task
        task.status = status;

        await task.save();
        return task;
      }
    } catch (error) {
      if (error?.response?.statusCode === 404) throw new NotFoundException(error?.message);
      throw new InternalServerErrorException();
    }
  }

  /**
   * @description
   * this service method finds a task by its id and then deletes the same
   * @param {number} id the id of the task to be updated
   */
  async deleteTask(id: number): Promise<void> {
    try {
      const result = await this.taskRepository.delete(id);

      // when the task to be deleted DNE in the database
      if (!result.affected) throw new NotFoundException(`Task with ID ${id} not found`);
    } catch (error) {
      if (error?.response?.statusCode === 404) throw new NotFoundException(error?.message);
      throw new InternalServerErrorException();
    }
  }
}
