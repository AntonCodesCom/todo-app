import { ObjectType, Field, InputType, PartialType } from '@nestjs/graphql';
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

//
// DTO class
//
@ObjectType()
export default class TodoDto implements TodoModel {
  @Field()
  id: string;

  @Field()
  label: string;

  @Field((type) => Boolean)
  done: boolean;
}

// DTO create class
@InputType()
export class TodoDtoCreate {
  @Field()
  label: string;

  @Field((type) => Boolean)
  done: boolean;
}

// DTO update class
@InputType()
export class TodoDtoUpdate extends PartialType(TodoDtoCreate) {}
