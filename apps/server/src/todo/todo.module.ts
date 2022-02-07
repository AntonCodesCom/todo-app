import { Module } from '@nestjs/common';
import TodoService from './todo.service';
import TodoController from './todo.controller';
import PrismaService from 'src/prisma/prisma.service';

@Module({
  controllers: [TodoController],
  providers: [PrismaService, TodoService],
})
export default class TodoModule {}
