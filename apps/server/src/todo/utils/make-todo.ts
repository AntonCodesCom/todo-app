import { v4 as uuid } from 'uuid';
import TodoEntity from '../entities/todo.entity';

export default function makeTodo({
  id = uuid(),
  label = '',
  done = false,
}: Partial<TodoEntity>): TodoEntity {
  return {
    id,
    label,
    done,
  };
}
