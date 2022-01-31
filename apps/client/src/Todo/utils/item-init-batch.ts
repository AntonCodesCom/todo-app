import TodoItem from 'Todo/interfaces/item';
import todoItemInit from './item-init';

export default function todoItemInitBatch(
  items: Partial<TodoItem>[]
): TodoItem[] {
  return items.map((x) => todoItemInit(x));
}
