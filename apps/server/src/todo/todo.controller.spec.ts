import TodoController from './todo.controller';
import { TodoDtoUpdate } from './todo.dto';
import TodoService from './todo.service';
import todosFixture from './todos.fixture';

// test data
const mockTodos = todosFixture;
const mockTodoToUpdate = mockTodos[3];
const mockUpdateFn = jest.fn().mockReturnValue(mockTodoToUpdate);
const mockTodoService = {
  findAll: async () => mockTodos,
  update: mockUpdateFn as any,
} as TodoService;

// SUT
const todoController = new TodoController(mockTodoService);

//
// unit test
//
describe.skip('TodoController', () => {
  test('findAll()', async () => {
    const actual = await todoController.findAll();
    const mockDtos = await mockTodoService.findAll();
    expect(actual).toEqual({ data: mockDtos });
  });

  test('update()', async () => {
    const { id, done } = mockTodoToUpdate;
    const mockUpdateDto: TodoDtoUpdate = {
      done: !done,
    };
    const actual = await todoController.update(id, mockUpdateDto);
    const expected = await mockTodoService.update(id, mockUpdateDto);
    expect(mockUpdateFn).toHaveBeenCalledWith(id, mockUpdateDto);
    expect(actual).toEqual({ data: expected });
  });
});
