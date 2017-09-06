import React from 'react'
import PropTypes from 'prop-types'
import RouteEditor from '../../components/RouteEditor'

class Routes extends React.Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired,
    startEditing: PropTypes.func.isRequired,
    finishEditing: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onMarkersChange: PropTypes.func.isRequired,
  }

  render () {
    const {
      editing,
      routes,
      startEditing,
      finishEditing,
      onUpdate,
      onMarkersChange,
    } = this.props

    return (
      <div>
        <select>
          {routes.map(route => (
            <option
              key={route.id}
              value={route.id}>
              {route.name}
            </option>
          ))}
        </select>

        {!editing && <button onClick={startEditing}>start editing</button>}
        {editing && <button onClick={finishEditing}>finish editing</button>}

        {routes && routes[0] && <RouteEditor
          route={routes[0]}
          editing={editing}
          onUpdate={onUpdate}
          onMarkersChange={onMarkersChange}
        />}
      </div>
    )
  }
}

export default Routes
