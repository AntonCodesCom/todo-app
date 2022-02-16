import { combineReducers } from 'redux';
import todoReducer from 'Todo/store';

const commonReducer = combineReducers({
  todo: todoReducer,
});

export default commonReducer;
