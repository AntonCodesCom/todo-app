import { v4 as uuid } from 'uuid';
import TodoItem from 'Todo/interfaces/item';

export default function todoItemInit({
  id = uuid(),
  label = '',
  done = false,
}: Partial<TodoItem>): TodoItem {
  return {
    id,
    label,
    done,
  };
}
