import { select, put, takeEvery } from 'redux-saga/effects'
import {
  REMOVE_ROUTE,
  setActiveRouteIndex,
} from '../modules/routes'

const removeRoute = function * () {
  const { activeRouteIndex } = yield select(state => state.routes)

  yield put(setActiveRouteIndex(Math.max(0, activeRouteIndex - 1)))
}

export default function * () {
  yield takeEvery(REMOVE_ROUTE, removeRoute)
}
