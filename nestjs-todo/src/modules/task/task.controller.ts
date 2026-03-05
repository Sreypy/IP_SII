import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  // GET ALL TASKS
  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }
  // GET ONE TASK
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.taskService.findOne(Number(id));
  }

  // CREATE TASK
  @Post()
  createTask(@Body() body: any) {
    return this.taskService.create(body);
  }

  // MARK DONE
  @Patch(':id/done')
  markTaskAsDone(@Param('id') id: string) {
    return this.taskService.update(Number(id), {
      completedAt: new Date(),
    });
  }

  // MARK PENDING
  @Patch(':id/pending')
  markTaskAsPending(@Param('id') id: string) {
    return this.taskService.update(Number(id), {
      completedAt: undefined,
    });
  }

  // DELETE
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.remove(Number(id));
  }
}