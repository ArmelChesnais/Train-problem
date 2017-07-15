'use strict';

// Station.js

class Station {
  constructor(id) {
    this.id = id;
    this.connections = {}
  }

  addConnection(otherStation, distance) {
    this.connections[otherStation.id] = { station: otherStation, distance: distance }
  }

  distanceTo(id) {
    let connection = this.getConnection(id)
    if( connection ) {
      return this.connections[id].distance
    }
    return 'NO SUCH ROUTE'
  }

  getConnection(otherID) {
    return this.connections[otherID]
  }

  getConnectedStation(id) {
    let connection = this.getConnection(id)
    if ( connection ) {
      return connection.station
    }
  }

  distanceOfPath(path) {
    let distance = this.distanceTo(path[0])
    if ( path.length > 1 && distance !== 'NO SUCH ROUTE' ) {
      let nextStation = this.getConnectedStation(path[0])
      let sum = nextStation.distanceOfPath(path.slice(1, path.length))
      if (sum === 'NO SUCH ROUTE') {
        distance = sum
      } else {
        distance += sum
      }
    }
    return distance
  }

  pathsToMaxStops(destination, stops) {
    let result = []
    for( let connection in this.connections ) {
      if ( connection === destination ) {
        result.push([destination])
      }
      // let nextSteps = []
      if ( stops > 1 ) {
        let nextSteps = this.getConnectedStation(connection).pathsToMaxStops(destination, stops - 1)
        result = result.concat(nextSteps)
      }
      let id = this.id
      // console.log('result loop from', this.id, ':', result)
    }
    result = result.map( path => {
      return [this.id].concat(path)
    })
    console.log('result from', this.id, ':', result)
    return result
  }
}


module.exports = Station