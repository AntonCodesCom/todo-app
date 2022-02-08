import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import TodoService from 'src/todo/todo.service';
import PrismaService from 'src/prisma/prisma.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService, TodoService, PrismaService],
})
export class SeedModule {}
