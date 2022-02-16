import CommonState from 'Common/interfaces/state';

export const todoItemsSelect = (state: CommonState) => state.todo.items;
export const todoErrorSelect = (state: CommonState) => state.todo.error;
