import { select, put, takeEvery } from 'redux-saga/effects'
import {
  ADD_ROUTE,
  setActiveRouteIndex,
  startEditing,
} from '../modules/routes'

const addRoute = function * (action) {
  const { editing, routes } = yield select(state => state.routes)

  if (!editing) {
    yield put(startEditing())
  }

  yield put(setActiveRouteIndex(routes.length - 1))
}

export default function * () {
  yield takeEvery(ADD_ROUTE, addRoute)
}
