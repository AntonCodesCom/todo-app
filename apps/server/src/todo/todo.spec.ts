import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import TodoModule from './todo.module';
import PrismaService from 'src/prisma/prisma.service';
import todosFixture from './todos.fixture';
import { TodoDtoUpdate } from './todo.dto';

// test data
const mockTodos = todosFixture;
const mockTodoToUpdate = mockTodos[1];
const mockUpdateFn = jest.fn().mockReturnValue(mockTodoToUpdate);
const mockPrismaService = {
  todo: {
    findMany: () => mockTodos,
    update: mockUpdateFn,
  },
};

//
// integration test
//
describe.skip('Todo REST', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('GET /todo', () => {
    return request(app.getHttpServer())
      .get('/todo')
      .expect(200)
      .expect({ data: mockTodos });
  });

  test('PATCH /todo/:id', async () => {
    const { id } = mockTodoToUpdate;
    const done = false;
    const updateDto: TodoDtoUpdate = { done };
    const arg = {
      where: { id },
      data: updateDto,
    };
    const response = await request(app.getHttpServer())
      .patch(`/todo/${id}`)
      .send(updateDto)
      .expect(200);
    expect(mockUpdateFn).toHaveBeenCalledWith(arg);
    expect(response.body).toEqual({ data: mockPrismaService.todo.update() });
  });
});
