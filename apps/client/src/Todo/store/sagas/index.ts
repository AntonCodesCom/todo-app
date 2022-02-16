import { call } from 'redux-saga/effects';
import todoFetchSaga from './fetch-saga';

export default function* todoSaga() {
  yield call(todoFetchSaga);
}
