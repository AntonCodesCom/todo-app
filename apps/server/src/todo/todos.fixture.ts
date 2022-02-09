import TodoEntity, { todoEntityInitBatch } from './todo.entity';

const todosFixture: TodoEntity[] = todoEntityInitBatch([
  {
    id: '6202e54d5c1009d1269cdc43',
    label: 'Init server',
    done: true,
  },
  {
    id: '6202e55878929c351a9f982e',
    label: 'Init Todo REST API',
    done: true,
  },
  {
    id: '6202e5639a730ec08cfec98b',
    label: 'Connect to database',
    done: true,
  },
  {
    id: '6202e56b474c66b2653d6bc4',
    label: 'Init Todo GraphQL API',
    done: false,
  },
  {
    id: '6202e575f1c74d0270eb4acc',
    label: 'Add auth layer',
    done: false,
  },
]);

export default todosFixture;
