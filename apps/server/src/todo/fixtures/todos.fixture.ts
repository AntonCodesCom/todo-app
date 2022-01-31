import TodoEntity from '../entities/todo.entity';
import makeTodoBatch from '../utils/make-todo-batch';

const todosFixture: TodoEntity[] = makeTodoBatch([
  {
    id: 'todo-entity-1',
    label: 'Init server',
    done: true,
  },
  {
    id: 'todo-entity-2',
    label: 'Init Todo REST API',
    done: true,
  },
  {
    id: 'todo-entity-3',
    label: 'Connect to database',
    done: false,
  },
  {
    id: 'todo-entity-4',
    label: 'Init Todo GraphQL API',
    done: false,
  },
  {
    id: 'todo-entity-5',
    label: 'Add auth layer',
    done: false,
  },
]);

export default todosFixture;
