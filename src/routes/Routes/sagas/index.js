import { call, put, takeEvery } from 'redux-saga/effects'
import { getDirections } from '../../../lib'
import {
  GET_DIRECTIONS_REQUEST,
  getDirectionsSuccess,
  getDirectionsFailure,
} from '../modules/route'

function * routesSaga () {
  yield takeEvery(GET_DIRECTIONS_REQUEST, function * (action) {
    if (action.payload.length < 2) {
      return
    }

    try {
      const directions = yield call(getDirections, action.payload.map(waypoint => waypoint.position))
      yield put(getDirectionsSuccess(directions))
    } catch (error) {
      yield put(getDirectionsFailure(error))
    }
  })
}

export default routesSaga
