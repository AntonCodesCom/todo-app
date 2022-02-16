import todoInitialState from './initial-state';
import { TODO_SET_ERROR, TODO_SET_ITEMS, TODO_UPDATE_ITEM } from './types';

export default function todoReducer(state = todoInitialState, action: any) {
  switch (action.type) {
    case TODO_SET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case TODO_SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case TODO_UPDATE_ITEM: {
      const item = action.payload;
      return {
        ...state,
        items: state.items?.map((x) => (x.id !== item.id ? x : item)),
      };
    }
    default:
      return state;
  }
}
