import TodoEntity, { todoEntityInit } from './todo.entity';

// initializer
export function todoDtoInit(partial: Partial<TodoDto>): TodoDto {
  return {
    ...todoEntityInit(partial),
  };
}

// bulk initializer
export function todoDtoInitBatch(partials: Partial<TodoDto>[]): TodoDto[] {
  return partials.map((x) => todoDtoInit(x));
}

// converter from entity
export function todoDtoFromEntity(entity: TodoEntity): TodoDto {
  return {
    ...entity,
  };
}

// DTO create interface
export interface TodoDtoCreate extends Omit<TodoDto, 'id'> {}

// DTO update interface
export interface TodoDtoUpdate extends Omit<TodoDtoCreate, 'label'> {}

//
// DTO interface
//
export default interface TodoDto extends TodoEntity {}
