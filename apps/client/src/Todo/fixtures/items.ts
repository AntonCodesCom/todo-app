import TodoItem, { todoItemInit } from 'Todo/interfaces/item';

// utility
function todoItemInitBatch(partials: Partial<TodoItem>[]): TodoItem[] {
  return partials.map((x) => todoItemInit(x));
}

//
// fixture
//
const todoItemsFixture: TodoItem[] = todoItemInitBatch([
  {
    id: 'todo-item-1',
    label: 'Render Todo list',
    done: true,
  },
  {
    id: 'todo-item-2',
    label: 'Display Todo cards',
    done: false,
  },
  {
    id: 'todo-item-3',
    label: 'Cover components with integration tests',
    done: false,
  },
]);

export default todoItemsFixture;
