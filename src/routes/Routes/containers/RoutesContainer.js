import { connect } from 'react-redux'
import {
  update,
  getDirectionsRequest,
} from '../modules/route'
import {
  startEditing,
  finishEditing,
} from '../modules/routes'
import Routes from '../components/Routes'

const mapStateToProps = state => ({
  ...state.routes,
  // editing: state.route.editing,
})

const mapDispatchToProps = {
  startEditing: startEditing,
  finishEditing: finishEditing,
  onUpdate: update,
  onMarkersChange: getDirectionsRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
