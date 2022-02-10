import { Module } from '@nestjs/common';
import TodoService from './todo.service';
import TodoController from './todo.controller';
import PrismaService from 'src/prisma/prisma.service';
import { TodoResolver } from './todo.resolver';

@Module({
  controllers: [TodoController],
  providers: [PrismaService, TodoService, TodoResolver],
})
export default class TodoModule {}
