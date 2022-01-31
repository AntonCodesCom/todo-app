import TodoEntity from '../entities/todo.entity';
import makeTodo from './make-todo';

export default function makeTodoBatch(
  entities: Partial<TodoEntity>[],
): TodoEntity[] {
  return entities.map((x) => makeTodo(x));
}
