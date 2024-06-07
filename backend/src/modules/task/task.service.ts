import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDto, TaskResDto } from './task.dto';
import { errorHandler } from 'src/helpers';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(taskDto: TaskDto): Promise<TaskResDto> {
    try {
      const task = await this.prisma.task.create({
        data: taskDto,
      });

      return task;
    } catch (e) {
      return errorHandler(
        {
          pointer: 'createTask service',
          text: 'Не удалось создать задачу',
        },
        e,
      );
    }
  }

  async changeTask(id: string, name: string): Promise<TaskResDto> {
    try {
      const task = await this.prisma.task.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
        },
      });

      return task;
    } catch (e) {
      return errorHandler(
        {
          pointer: 'changeTask service',
          text: 'Не удалось изменить задачу',
        },
        e,
      );
    }
  }

  async toggleDone(id: string, isDone: boolean): Promise<TaskResDto> {
    try {
      const task = this.prisma.task.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          isDone,
        },
      });

      return task;
    } catch (e) {
      return errorHandler(
        {
          pointer: 'toggleDone service',
          text: 'Не удалось изменить статус задачи',
        },
        e,
      );
    }
  }

  async deleteTask(id: string) {
    try {
      await this.prisma.task.delete({
        where: { id: parseInt(id, 10) },
      });
    } catch (e) {
      return errorHandler(
        {
          pointer: 'deleteTask service',
          text: 'Не удалось удалить задачу',
        },
        e,
      );
    }
  }

  async getAllTasks(): Promise<TaskResDto[]> {
    try {
      const tasks = await this.prisma.task.findMany();
      return tasks;
    } catch (e) {
      return errorHandler(
        {
          pointer: 'getAllTasks service',
          text: 'Не удалось получить все задачи',
        },
        e,
      );
    }
  }

  async getOneTask(id: string): Promise<TaskResDto> {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });
      return task;
    } catch (e) {
      return errorHandler(
        {
          pointer: 'getOneTask service',
          text: 'Не удалось получить задачу',
        },
        e,
      );
    }
  }
}
