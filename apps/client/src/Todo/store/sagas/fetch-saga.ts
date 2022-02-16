import TodoDto from '@antoncodes/server/src/todo/todo.dto';
import commonFetch from 'Common/utils/fetch';
import { delay, put } from 'redux-saga/effects';
import todoItemsFixture from 'Todo/fixtures/items';
import { todoItemFromDto } from 'Todo/interfaces/item';
import { todoSetError, todoSetItems } from '../actions';

/* eslint-disable */
function* todoFetchSagaDev() {
  yield delay(1000);
  yield put(todoSetItems(todoItemsFixture));
  // yield put(todoSetError(new Error('Test error.')))
}
/* eslint-enable */

function* todoFetchSagaProd(): any {
  try {
    const res = yield commonFetch('todo');
    const json = yield res.json();
    const data = json.data as TodoDto[];
    const items = data.map((x) => todoItemFromDto(x));
    yield put(todoSetItems(items));
  } catch (err) {
    yield put(todoSetError(new Error('Test error.')));
  }
}

// const todoFetchSaga = todoFetchSagaDev;
const todoFetchSaga = todoFetchSagaProd;

export default todoFetchSaga;
