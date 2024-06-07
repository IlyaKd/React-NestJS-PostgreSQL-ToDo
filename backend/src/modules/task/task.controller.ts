import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto, TaskResDto } from './task.dto';
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { errorHandler } from 'src/helpers';

@ApiTags('Задачи')
@Controller('/task/v1')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: TaskResDto })
  async createTask(@Body() taskDto: TaskDto) {
    try {
      return this.taskService.createTask(taskDto);
    } catch (e) {
      return errorHandler(
        {
          pointer: 'createTask controller',
          text: 'Не удалось создать задачу',
        },
        e,
      );
    }
  }

  @Put('/change/:id')
  @ApiOperation({ summary: 'Редактирование задачи' })
  @ApiResponse({ status: 200, type: TaskResDto })
  async changeTask(@Param('id') id: string, @Body() { name }: TaskDto) {
    try {
      return await this.taskService.changeTask(id, name);
    } catch (e) {
      return errorHandler(
        {
          pointer: 'changeTask controller',
          text: 'Не удалось изменить задачу',
        },
        e,
      );
    }
  }

  @Put('/done/:id')
  @ApiOperation({ summary: 'Изменение статуса задачи' })
  @ApiResponse({ status: 200, type: TaskResDto })
  async toggleDone(@Param('id') id: string, @Body() { isDone }: TaskDto) {
    try {
      return await this.taskService.toggleDone(id, isDone);
    } catch (e) {
      return errorHandler(
        {
          pointer: 'toggleDone controller',
          text: 'Не удалось изменить статус задачи',
        },
        e,
      );
    }
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiNoContentResponse()
  async deleteTask(@Param('id') id: string) {
    try {
      await this.taskService.deleteTask(id);
    } catch (e) {
      return errorHandler(
        {
          pointer: 'deleteTask controller',
          text: 'Не удалось удалить задачу',
        },
        e,
      );
    }
  }

  @Get('/all')
  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, type: [TaskResDto] })
  async getAllTasks() {
    try {
      return this.taskService.getAllTasks();
    } catch (e) {
      return errorHandler(
        {
          pointer: 'getAllTasks controller',
          text: 'Не удалось получить все задачи',
        },
        e,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одной задачи' })
  @ApiResponse({ status: 200, type: TaskResDto })
  async getOneTask(@Param('id') id: string) {
    try {
      return this.taskService.getOneTask(id);
    } catch (e) {
      return errorHandler(
        {
          pointer: 'getOneTask controller',
          text: 'Не удалось получить задачу',
        },
        e,
      );
    }
  }
}
