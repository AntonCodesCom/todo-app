import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import TodoEntity, { TodoEntityCreate } from './entities/todo.entity';

@Injectable()
export default class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPartial: TodoEntityCreate): Promise<void> {
    await this.prismaService.todo.create({
      data: createPartial,
    });
  }

  async createMany(createPartials: TodoEntityCreate[]): Promise<void> {
    await this.prismaService.todo.createMany({
      data: createPartials,
    });
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.prismaService.todo.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
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
