import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import TodoService from './todo.service';
import TodoDto, { TodoDtoCreate, TodoDtoUpdate } from './todo.dto';

@Resolver(() => TodoDto)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => TodoDto)
  createTodo(@Args('createTodoInput') createTodoInput: TodoDtoCreate) {
    return this.todoService.create(createTodoInput);
  }

  @Query(() => [TodoDto], { name: 'todos' })
  async findAll() {
    return await this.todoService.findAll();
  }

  @Query(() => TodoDto, { name: 'todo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => TodoDto)
  async updateTodo(
    @Args('id') id: string,
    @Args('updateTodoInput') updateTodoInput: TodoDtoUpdate,
  ) {
    return await this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => TodoDto)
  async removeTodo(@Args('id', { type: () => String }) id: string) {
    return await this.todoService.deleteById(id);
  }
}
