import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks();
    // }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    // @Post()
    // createTask(@Body() body) {
    //     console.log(body);
    // }

    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task {
    //     return this.tasksService.createTask(title, description);
    // }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch(':id/status')
    updateTaskStatus( 
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete(':id')
    deleteTaskById(@Param('id') id: string): string {
        this.tasksService.deleteTaskById(id);
        return "Task Deleted.";
    }
}
