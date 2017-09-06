import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps'
import { MAP, DIRECTIONS_RENDERER } from 'react-google-maps/lib/constants'
import withScriptjs from 'react-google-maps/lib/async/withScriptjs'

class AsyncMap extends React.Component {
  static propTypes = {
    markers: PropTypes.array,
    directionsRenderer: PropTypes.any,
    onMapLoad: PropTypes.func,
    onMapClick: PropTypes.func,
    onDirectionsLoad: PropTypes.func,
    onDirectionsChange: PropTypes.func,
  }

  state = {
    map: null,
    directionsRenderer: null,
  }

  onMapLoad = map => {
    if (!map) {
      return
    }

    this.setState({
      map: map.context[MAP],
    })

    this.props.onMapLoad && this.props.onMapLoad(map.context[MAP])
  }

  onDirectionsLoad = directionsRenderer => {
    this.setState({
      directionsRenderer,
    })

    this.props.onDirectionsLoad && this.props.onDirectionsLoad(directionsRenderer)
  }

  onDirectionsChange = () => {
    const directions = this.state.directionsRenderer.state[DIRECTIONS_RENDERER].getDirections()

    this.props.onDirectionsChange && this.props.onDirectionsChange(directions)
  }

  render () {
    const { markers, directionsRenderer, onMapClick } = this.props

    return (
      <GoogleMap
        ref={this.onMapLoad}
        defaultZoom={13}
        defaultCenter={{ lat: 46.7707134, lng: 23.5780973 }}
        onClick={onMapClick}
      >
        {markers && markers.map((marker, index) => (
          <Marker
            {...marker}
            key={index}
            // onRightClick={() => props.onMarkerRightClick(index)}
          />
        ))}
        {directionsRenderer && directionsRenderer.directions && <DirectionsRenderer
          {...directionsRenderer}
          ref={this.onDirectionsLoad}
          onDirectionsChanged={this.onDirectionsChange}
        />}
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(AsyncMap))
