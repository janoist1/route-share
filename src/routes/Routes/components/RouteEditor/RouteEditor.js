import React from 'react'
import PropTypes from 'prop-types'
import AsyncMap from '../AsyncMap'
import FaSpinner from 'react-icons/lib/fa/spinner'
import './RouteEditor.scss'

const key = 'AIzaSyCqLYkTZRH-u3j9Zc3fPXtbkqfuyLlmWqU'
const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3&libraries=places,geometry&key=${key}`

class RouteEditor extends React.Component {
  static propTypes = {
    editing: PropTypes.bool.isRequired,
    route: PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
    onMarkersChange: PropTypes.func.isRequired,
  }

  state = {
    markers: [],
  }

  onMapClick = event => {
    if (!this.props.editing) {
      return
    }

    const marker = {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      draggable: true,
    }

    this.setState({
      markers: [
        ...this.state.markers,
        marker,
      ],
    }, () => {
      this.props.onMarkersChange(this.state.markers)
    })
  }

  onNameChange = event => {
    this.props.onUpdate({ name: event.target.value })
  }

  onDirectionsChange = directions => {
    this.synchronizeMarkers(directions)
    this.props.onUpdate({ directions })
  }

  synchronizeMarkers = directions => {
    const { origin, destination, waypoints } = directions.request
    let markers = [
      origin.location ? origin.location : origin,
      ...(waypoints.map(waypoint => waypoint.location.location ? waypoint.location.location : waypoint.location)),
      destination.location ? destination.location : destination,
    ].map(waypoint => ({
      position: {
        lat: waypoint.lat(),
        lng: waypoint.lng(),
      },
    }))

    this.setState({ markers })
  }

  componentWillMount () {
    if (this.props.route.directions) {
      this.synchronizeMarkers(this.props.route.directions)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.route.directions !== nextProps.route.directions) {
      this.synchronizeMarkers(nextProps.route.directions)
    }
  }

  render () {
    const { editing, route } = this.props

    return (
      <div className='route-editor'>
        {editing && <input type='text' value={route.name} onChange={this.onNameChange} />}

        <AsyncMap
          googleMapURL={googleMapURL}
          loadingElement={
            <div style={{ height: `100%` }}>
              <FaSpinner
                style={{
                  display: `block`,
                  width: `80px`,
                  height: `80px`,
                  margin: `150px auto`,
                  animation: `fa-spin 2s infinite linear`,
                }}
              />
            </div>
          }
          containerElement={
            <div className='container-element' />
          }
          mapElement={
            <div className='map-element' />
          }
          markers={route.directions ? [] : this.state.markers}
          directionsRenderer={{
            directions: route.directions,
            options: {
              draggable: editing,
            },
          }}
          onMapClick={this.onMapClick}
          onDirectionsChange={this.onDirectionsChange}
          // onMarkerRightClick={_.noop}
          // onClick={props.onMapClick}
        />
      </div>
    )
  }
}

export default RouteEditor
