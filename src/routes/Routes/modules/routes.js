import routeReducer, { initialState as routeInitialState } from './route'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_ROUTE = 'routes/ADD_ROUTE'
export const SET_EDITING = 'routes/SET_EDITING'

export const consts = {
  ADD_ROUTE,
  SET_EDITING,
}

// ------------------------------------
// Actions
// -----------------------------------
export const setEditing = editing => ({
  type: SET_EDITING,
  payload: editing,
})

export const startEditing = () => dispatch => {
  dispatch(setEditing(true))
}

export const finishEditing = () => dispatch => {
  dispatch(setEditing(false))
}

export const addRoute = route => ({
  type: ADD_ROUTE,
  payload: route,
})

export const actions = {
  setEditing,
  startEditing,
  finishEditing,
  addRoute,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_EDITING]: (state, action) => ({
    ...state,
    editing: action.payload,
  }),
  [ADD_ROUTE]: (state, action) => ({
    ...state,
    routes: [
      ...state.routes,
      action.payload,
    ],
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  routes: [ routeInitialState ],
  activeRouteId: routeInitialState.id,
  editing: false,
}

export default function routesReducer (state = initialState, action) {
  if (action.type.startsWith('route/')) {
    return {
      ...state,
      routes: [
        ...state.routes.slice(0, action.meta.index),
        routeReducer(state.routes[action.meta.index], action),
        ...state.routes.slice(action.meta.index + 1),
      ],
    }
  }

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
