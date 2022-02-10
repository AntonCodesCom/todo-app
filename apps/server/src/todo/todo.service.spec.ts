import PrismaService from 'src/prisma/prisma.service';
import TodoService from './todo.service';
import todosFixture from './todos.fixture';

// test data
const mockTodos = todosFixture.slice(3);
const mockPrismaService = {
  todo: {
    findMany: async () => mockTodos,
  },
} as PrismaService;

// SUT
const todoService = new TodoService(mockPrismaService);

//
// unit test
//
describe.skip('TodoService', () => {
  test('findAll()', async () => {
    const actual = await todoService.findAll();
    const expected = await mockPrismaService.todo.findMany();
    expect(actual).toEqual(expected);
  });
});
