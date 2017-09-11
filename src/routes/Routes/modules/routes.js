import routeReducer, { initialState as routeInitialState } from './route'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_ROUTE = 'routes/ADD_ROUTE'
export const REMOVE_ROUTE = 'routes/REMOVE_ROUTE'
export const SET_ACTIVE_ROUTE_INDEX = 'routes/SET_ACTIVE_ROUTE_INDEX'
export const SET_EDITING = 'routes/SET_EDITING'

export const consts = {
  ADD_ROUTE,
  SET_ACTIVE_ROUTE_INDEX,
  SET_EDITING,
}

// ------------------------------------
// Actions
// -----------------------------------
export const setEditing = editing => ({
  type: SET_EDITING,
  payload: editing,
})
export const setActiveRouteIndex = index => ({
  type: SET_ACTIVE_ROUTE_INDEX,
  payload: index,
})

export const startEditing = () => dispatch => {
  // TODO: remove thunk or finish implementation
  dispatch(setEditing(true))
}

export const finishEditing = () => dispatch => {
  // TODO: remove thunk or finish implementation
  dispatch(setEditing(false))
}

export const addRoute = (route = routeInitialState) => ({
  type: ADD_ROUTE,
  payload: route,
})

export const removeRoute = index => (dispatch, getState) => {
  let routeIndexToRemove = index

  if (routeIndexToRemove === undefined) {
    routeIndexToRemove = getState().routes.activeRouteIndex
  }

  dispatch({
    type: REMOVE_ROUTE,
    payload: routeIndexToRemove,
  })
}

export const actions = {
  setEditing,
  startEditing,
  finishEditing,
  addRoute,
  removeRoute,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EDITING]: (state, action) => ({
    ...state,
    editing: action.payload,
  }),
  [SET_ACTIVE_ROUTE_INDEX]: (state, action) => ({
    ...state,
    activeRouteIndex: action.payload,
  }),
  [ADD_ROUTE]: (state, action) => ({
    ...state,
    routes: [
      ...state.routes,
      action.payload,
    ],
  }),
  [REMOVE_ROUTE]: (state, action) => ({
    ...state,
    routes: [
      ...state.routes.slice(0, action.payload),
      ...state.routes.slice(action.payload + 1),
    ],
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  routes: [ routeInitialState ],
  activeRouteIndex: 0,
  editing: false,
}

export default (state = initialState, action) => {
  if (action.type.startsWith('route/')) {
    return {
      ...state,
      routes: [
        ...state.routes.slice(0, state.activeRouteIndex),
        routeReducer(state.routes[state.activeRouteIndex], action),
        ...state.routes.slice(state.activeRouteIndex + 1),
      ],
    }
  }

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
