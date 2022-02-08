import { Todo as TodoModel } from '@prisma/client';
import { ObjectId } from 'bson';

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

export function todoEntityInitBatch(
  partials: Partial<TodoEntity>[],
): TodoEntity[] {
  return partials.map((x) => todoEntityInit(x));
}

export interface TodoEntityCreate extends Omit<TodoEntity, 'id'> {
  id?: string;
}

export default interface TodoEntity extends TodoModel {}
