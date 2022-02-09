import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import TodoService from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import TodoDto, { todoDtoFromEntity } from './todo.dto';
import CommonResponse from 'src/common/response';

@Controller('todo')
export default class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    // return this.todoService.create(createTodoDto);
    return 'Not yet implemented.';
  }

  @Get()
  async findAll(): Promise<CommonResponse<TodoDto[]>> {
    const entities = await this.todoService.findAll();
    const dtos = entities.map((x) => todoDtoFromEntity(x));
    return { data: dtos };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.deleteById(id);
  }
}
