import TodoItem from 'Todo/interfaces/item';
import { TODO_SET_ERROR, TODO_SET_ITEMS, TODO_UPDATE_ITEM } from './types';

export function todoSetItems(items: TodoItem[]) {
  return {
    type: TODO_SET_ITEMS,
    payload: items,
  };
}

export function todoSetError(error: Error) {
  return {
    type: TODO_SET_ERROR,
    payload: error,
  };
}

export function todoUpdateItem(item: TodoItem) {
  return {
    type: TODO_UPDATE_ITEM,
    payload: item,
  };
}
