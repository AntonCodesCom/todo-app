import { Todo as TodoModel } from '@prisma/client';
import { ObjectId } from 'bson';

// initializer
export function todoDtoInit({
  id = new ObjectId().toString(),
  label = 'Something to do.',
  done = false,
}: Partial<TodoDto>): TodoDto {
  return {
    id,
    label,
    done,
  };
}

// DTO create interface
export interface TodoDtoCreate extends Omit<TodoDto, 'id'> {}

// DTO update interface
export interface TodoDtoUpdate extends Partial<TodoDtoCreate> {}

//
// DTO interface
//
export default interface TodoDto extends TodoModel {}
