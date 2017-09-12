import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import RouteEditor from '../../components/RouteEditor'
import './Routes.scss'

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

  onNameChange = event => {
    this.props.onUpdate({ name: event.target.value })
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
    const route = routes && routes[activeRouteIndex]

    return (
      <div className='routes__container'>
        <div className='routes__control'>
          {!editing && <select value={activeRouteIndex} onChange={this.onRouteSelect}>
            {routes.map((route, index) => (
              <option
                key={index}
                value={index}
              >
                {route.name}
              </option>
            ))}
          </select>}
          {' '}
          {!editing && <Button size='sm' outline color='success' onClick={this.onNewClick}>new</Button>}
          {editing && route && <input type='text' value={route.name} onChange={this.onNameChange} />}
          {' '}
          <Button size='sm' outline color='danger' onClick={this.onDeleteClick}>delete</Button>
          {' '}
          {!editing && <Button size='sm' outline onClick={startEditing}>start editing</Button>}
          {editing && <Button size='sm' outline onClick={finishEditing}>finish editing</Button>}
        </div>

        {route && <RouteEditor
          route={route}
          editing={editing}
          onUpdate={onUpdate}
          onMarkersChange={onMarkersChange}
        />}
      </div>
    )
  }
}

export default Routes
