import PrismaService from 'src/prisma/prisma.service';
import { TodoDtoUpdate } from './todo.dto';
import TodoService from './todo.service';
import todosFixture from './todos.fixture';

// test data
const mockTodos = todosFixture.slice(1); // randomizing
const mockFindManyFn = jest.fn().mockReturnValue(mockTodos);
const mockUpdateFn = jest.fn().mockReturnValue(mockTodos[0]);
const mockPrismaService = {
  todo: {
    findMany: mockFindManyFn as any,
    update: mockUpdateFn as any,
  },
} as PrismaService;

// SUT
const todoService = new TodoService(mockPrismaService);

//
// unit test
//
describe('TodoService', () => {
  test('findAll()', async () => {
    const actual = await todoService.findAll();
    expect(mockFindManyFn).toHaveBeenCalled();
    expect(actual).toEqual(mockPrismaService.todo.findMany());
  });

  test('update()', async () => {
    const id = 'test-id';
    const updateDto: TodoDtoUpdate = { done: true };
    const arg = {
      where: { id },
      data: updateDto,
    };
    const actual = await todoService.update(id, updateDto);
    expect(mockUpdateFn).toHaveBeenCalledWith(arg);
    expect(actual).toEqual(mockPrismaService.todo.update(arg));
  });
});
