import TodoDto from '@antoncodes/server/src/todo/todo.dto';
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

// converter from DTO
export function todoItemFromDto(dto: TodoDto): TodoItem {
  return {
    ...dto,
  };
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
