import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import TodoDto, { TodoDtoCreate, TodoDtoUpdate } from './todo.dto';
import todosFixture from './todos.fixture';

@Injectable()
export default class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPartial: TodoDtoCreate | TodoDto): Promise<void> {
    await this.prismaService.todo.create({
      data: createPartial,
    });
  }

  async createMany(createPartials: TodoDtoCreate[] | TodoDto[]): Promise<void> {
    await this.prismaService.todo.createMany({
      data: createPartials,
    });
  }

  async findAll(): Promise<TodoDto[]> {
    return await this.prismaService.todo.findMany();
  }

  findOne(id: string) {
    return todosFixture[0];
  }

  async update(id: string, updateTodoDto: TodoDtoUpdate): Promise<TodoDto> {
    return await this.prismaService.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.todo.delete({
      where: { id },
    });
  }

  async deleteMany(): Promise<void> {
    await this.prismaService.todo.deleteMany();
  }
}
