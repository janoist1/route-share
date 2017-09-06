export const getDirections = coordinates => {
  if (!google) {
    return Promise.reject(Error('Google client is not present'))
  }

  if (coordinates.length < 2) {
    return Promise.reject(Error('Not enough waypoints'))
  }

  const directionsService = new google.maps.DirectionsService()
  const origin = coordinates[0]
  const destination = coordinates.slice(-1)[0]
  const waypoints = coordinates.slice(1, -1).map(waypoint => ({
    location: waypoint,
    stopover: false,
  }))

  return new Promise((resolve, reject) => {
    directionsService.route({
      origin,
      destination,
      waypoints,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
    }, (response, status) => {
      if (status === 'OK') {
        resolve(response)
      } else {
        reject(Error('Directions request failed due to ' + status))
      }
    })
  })
}

export const decodePolyline = encoded => {
  if (!encoded) {
    return []
  }

  const poly = []
  let index = 0
  let len = encoded.length
  let lat = 0
  let lng = 0

  while (index < len) {
    let b
    let shift = 0
    let result = 0

    do {
      b = encoded.charCodeAt(index++) - 63
      result = result | ((b & 0x1f) << shift)
      shift += 5
    } while (b >= 0x20)

    let dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1)
    lat += dlat

    shift = 0
    result = 0

    do {
      b = encoded.charCodeAt(index++) - 63
      result = result | ((b & 0x1f) << shift)
      shift += 5
    } while (b >= 0x20)

    let dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1)
    lng += dlng

    let p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    }

    poly.push(p)
  }

  return poly
}
