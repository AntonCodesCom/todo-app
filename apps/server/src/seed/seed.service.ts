import { Injectable } from '@nestjs/common';
import todosFixture from 'src/todo/todos.fixture';
import TodoService from 'src/todo/todo.service';

@Injectable()
export class SeedService {
  constructor(private readonly todoService: TodoService) {}

  async seed(): Promise<void> {
    await this.todoService.deleteMany();
    await this.todoService.createMany(todosFixture);
  }
}
