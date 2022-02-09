import { Todo as TodoModel } from '@prisma/client';
import { ObjectId } from 'bson';

// initializer
export function todoEntityInit({
  id = new ObjectId().toString(),
  label = 'Something to do.',
  done = false,
}: Partial<TodoEntity>): TodoEntity {
  return {
    id,
    label,
    done,
  };
}

// bulk initializer
export function todoEntityInitBatch(
  partials: Partial<TodoEntity>[],
): TodoEntity[] {
  return partials.map((x) => todoEntityInit(x));
}

// entity create interface
export interface TodoEntityCreate extends Omit<TodoEntity, 'id'> {
  id?: string;
}

// entity update interface
export interface TodoEntityUpdate extends TodoEntityCreate {}

//
// entity interface
//
export default interface TodoEntity extends TodoModel {}
