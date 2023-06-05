import { all, fork } from 'redux-saga/effects'

function* helloSaga() {
  console.log('Hello Redux-Saga')
}

export default function* rootSaga() {
  yield all([helloSaga()])
}
