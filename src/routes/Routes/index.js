import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'routes',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Routes = require('./containers/RoutesContainer').default
      const reducer = require('./modules/routes').default

      /*  Add the reducer to the store on key 'routes'  */
      injectReducer(store, { key: 'routes', reducer })

      /*  Return getComponent   */
      cb(null, Routes)

      /* Webpack named bundle   */
    }, 'routes')
  },
})
