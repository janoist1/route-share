import { connect } from 'react-redux'
import {
  update,
  getDirectionsRequest,
} from '../modules/route'
import {
  addRoute,
  removeRoute,
  setActiveRouteIndex,
  startEditing,
  finishEditing,
} from '../modules/routes'
import Routes from '../components/Routes'

const mapStateToProps = state => ({
  ...state.routes,
})

const mapDispatchToProps = {
  startEditing: startEditing,
  finishEditing: finishEditing,
  onNewClick: addRoute,
  onDeleteClick: removeRoute,
  onRouteSelect: index => setActiveRouteIndex(+index),
  onUpdate: update,
  onMarkersChange: getDirectionsRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
