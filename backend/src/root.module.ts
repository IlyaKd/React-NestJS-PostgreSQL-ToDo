import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule, TaskModule],
})
export class RootModule {}
