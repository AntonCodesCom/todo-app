import { ObjectId } from 'bson';

// initializer
export function todoItemInit({
  id = new ObjectId().toString(),
  label = 'Something to do.',
  done = false,
}: Partial<TodoItem>): TodoItem {
  return {
    id,
    label,
    done,
  };
}

// bulk initializer
export function todoItemInitBatch(partials: Partial<TodoItem>[]): TodoItem[] {
  return partials.map((x) => todoItemInit(x));
}

// item update interface
export interface TodoItemUpdate {
  done: boolean;
}

//
// item interface
//
export default interface TodoItem {
  id: string;
  label: string;
  done: boolean;
}
