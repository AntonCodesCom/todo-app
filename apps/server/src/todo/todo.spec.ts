import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import TodoModule from './todo.module';
import todosFixture from './todos.fixture';
import { todoDtoInit, TodoDtoUpdate } from './todo.dto';
import TodoService from './todo.service';

// test data
const mockTodos = todosFixture;
const mockTodoToUpdate = todoDtoInit({
  id: 'todo-test-id-rest',
  label: 'Test Todo REST.',
  done: true,
});
const mockFindAllFn = jest.fn().mockReturnValue(mockTodos);
const mockUpdateFn = jest.fn().mockReturnValue(mockTodoToUpdate);
const mockTodoService = {
  findAll: mockFindAllFn,
  update: mockUpdateFn,
};

//
// integration test
//
describe('Todo REST', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    })
      .overrideProvider(TodoService)
      .useValue(mockTodoService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('GET /todo', async () => {
    const response = await request(app.getHttpServer())
      .get('/todo')
      .expect(200);
    expect(mockFindAllFn).toHaveBeenCalled();
    expect(response.body).toEqual({ data: mockTodoService.findAll() });
  });

  test('PATCH /todo/:id', async () => {
    const { id } = mockTodoToUpdate;
    const updateDto: TodoDtoUpdate = { done: false };
    const response = await request(app.getHttpServer())
      .patch(`/todo/${id}`)
      .send(updateDto)
      .expect(200);
    expect(mockUpdateFn).toHaveBeenCalledWith(id, updateDto);
    expect(response.body).toEqual({ data: mockTodoService.update() });
  });
});
