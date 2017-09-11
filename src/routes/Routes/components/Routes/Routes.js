import React from 'react'
import PropTypes from 'prop-types'
import RouteEditor from '../../components/RouteEditor'

class Routes extends React.Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
    activeRouteIndex: PropTypes.number.isRequired,
    startEditing: PropTypes.func.isRequired,
    finishEditing: PropTypes.func.isRequired,
    onNewClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onRouteSelect: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onMarkersChange: PropTypes.func.isRequired,
  }

  onNewClick = () => {
    this.props.onNewClick()
  }

  onDeleteClick = () => {
    this.props.onDeleteClick()
  }

  onRouteSelect = event => {
    this.props.onRouteSelect(event.target.value)
  }

  render () {
    const {
      editing,
      routes,
      activeRouteIndex,
      startEditing,
      finishEditing,
      onUpdate,
      onMarkersChange,
    } = this.props

    return (
      <div>
        <select value={activeRouteIndex} onChange={this.onRouteSelect}>
          {routes.map((route, index) => (
            <option
              key={index}
              value={index}
            >
              {route.name}
            </option>
          ))}
        </select>

        <input type={'button'} value={'new'} onClick={this.onNewClick} />
        <input type={'button'} value={'delete'} onClick={this.onDeleteClick} />

        {!editing && <button onClick={startEditing}>start editing</button>}
        {editing && <button onClick={finishEditing}>finish editing</button>}

        {routes && routes[activeRouteIndex] && <RouteEditor
          route={routes[activeRouteIndex]}
          editing={editing}
          onUpdate={onUpdate}
          onMarkersChange={onMarkersChange}
        />}
      </div>
    )
  }
}

export default Routes
