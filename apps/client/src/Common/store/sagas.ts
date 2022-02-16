import { fork } from 'redux-saga/effects';
import todoSaga from 'Todo/store/sagas';

export default function* commonSaga() {
  yield fork(todoSaga);
}
