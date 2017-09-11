// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE = 'route/UPDATE'
export const GET_DIRECTIONS_REQUEST = 'route/GET_DIRECTIONS_REQUEST'
export const GET_DIRECTIONS_SUCCESS = 'route/GET_DIRECTIONS_SUCCESS'
export const GET_DIRECTIONS_FAILURE = 'route/GET_DIRECTIONS_FAILURE'

export const consts = {
  UPDATE,
  GET_DIRECTIONS_REQUEST,
  GET_DIRECTIONS_SUCCESS,
  GET_DIRECTIONS_FAILURE,
}

// ------------------------------------
// Actions
// ------------------------------------
export const update = route => ({
  type: UPDATE,
  payload: route,
})

export const getDirectionsRequest = waypoints => ({
  type: GET_DIRECTIONS_REQUEST,
  payload: waypoints,
})

export const getDirectionsSuccess = directions => ({
  type: GET_DIRECTIONS_SUCCESS,
  payload: directions,
})

export const getDirectionsFailure = error => ({
  type: GET_DIRECTIONS_FAILURE,
  payload: error,
})

export const actions = {
  update,
  getDirectionsRequest,
  getDirectionsSuccess,
  getDirectionsFailure,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [GET_DIRECTIONS_SUCCESS]: (state, action) => ({
    ...state,
    directions: action.payload,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  id: null,
  name: 'Test',
  directions: null,
}

export default function routeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
