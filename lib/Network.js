'use strict';

// Network.js

const Station = require('../lib/Station');

class Network {
  constructor(graph) {
    this.stations = {}
    if (graph) {
      let splitGraph = graph.split(', ')
      splitGraph.forEach( edge => {
        let origin = this.findOrAddStation(edge[0])
        let destination = this.findOrAddStation(edge[1])
        origin.addConnection(destination, Number(edge[2]))
      })
    }
  }

  addStation(stationId) {
    let newStation = new Station(stationId)
    this.stations[stationId] = newStation
    return newStation
  }

  findStation(id){
    if ( this.stations[id] ) {
      return this.stations[id]
    }
  }

  findOrAddStation(id){
    let result = this.findStation(id)
    if ( !result ) {
      result = this.addStation(id)
    }
    return result
  }

  getDistanceOfPath(path) {
    if (typeof path === "string") {
      path = path.split('-')
    }
    let start = this.findStation(path[0])
    return start.distanceOfPath(path.slice(1, path.length))
  }



  pathsToMaxStops(origin, destination, stops) {
    let originStation = this.findStation(origin)
    return originStation.pathsToMaxStops(destination, stops)
  }

  numPathsToMaxStops(origin, destination, stops) {
    let paths = this.pathsToMaxStops(origin, destination, stops)
    return paths.length
  }

  numPathsToExactStops(origin, destination, stops) {
    let paths = this.findStation(origin).pathsToMaxStops(destination, stops)
    paths = paths.filter( path => {
      return path.length === stops + 1
    })
    return paths.length
  }

  // shortestRouteDistance(origin, destination) {
  //   let queue = [[origin]]
  //   let shortest = null
  //   do {
  //     let currentPath = queue.shift()
  //     let lastStationId = currentPath[currentPath.length - 1]
  //     let lastStationConnections = this.findStation(lastStationId).getConnectionIds()
  //     lastStationConnections.forEach( id => {
  //       let newPath = currentPath.concat(id)
  //       if ( shortest === null || shortest > this.getDistanceOfPath(newPath)) {
  //         if ( id === destination ) {
  //           shortest = this.getDistanceOfPath(newPath)
  //         } else {
  //           queue.push(newPath)
  //         }
  //       }
  //     })
  //   } while ( queue.length > 0 )
  //   return shortest
  // }

  shortestRouteDistance(origin, destination) {
    let params = {
      origin: origin,
      destination: destination,
      strategy: 'breadth'
    }
    return this.processDemand(params)
  }

  numRoutesWithinDistance(origin, destination, distance) {
    // let queue = [origin]
    // let foundPaths = 0
    // do {
    //   let currentPath = queue.shift()
    //   let lastStationId = currentPath[currentPath.length - 1]
    //   let lastStationConnections = this.findStation(lastStationId).getConnectionIds()
    //   lastStationConnections.forEach( id => {
    //     let newPath = currentPath + '-' + id
    //     if ( this.getDistanceOfPath(newPath) < distance) {
    //       if ( id === destination ) {
    //         foundPaths++
    //       }
    //       queue.push(newPath)
    //     }
    //   })
    // } while ( queue.length > 0 )
    // return foundPaths
    let params = {
      origin: origin,
      destination: destination,
      cutoff: 'distance',
      cutoffValue: distance,
      result: 'number'
    }
    return this.processDemand(params)
  }

  processDemand(params) {
    let queue = [[params.origin]]
    let result = 0
    let nextElement = () => { return queue.shift() } // default to breadth-first search
    if ( params.strategy === 'depth') {
      nextElement = () => { return queue.pop() }
    }

    let cont = (path) => { // default is cutting off at the shortest path
      return (result === 0 || result > this.getDistanceOfPath(path))
    }
    if ( params.cutoff === 'stops' ) {
      cont = (path) => { return path.length <= params.cutoffValue + 1 }
    } else if ( params.cutoff === 'distance' ) {
      cont = (path) => { return this.getDistanceOfPath(path) < params.cutoffValue }
    }

    let validator = (path, id) => { // default is finding the shortest length
      if ( id === params.destination ) {
        result = this.getDistanceOfPath(path)
      }
    }
    if ( params.result === 'number') {
      validator = (path, id) => {
        if ( id === params.destination ) {
          result++
        }
      }
    }

    do {
      let currentPath = nextElement()
      let lastStationId = currentPath[currentPath.length - 1]
      let lastStationConnections = this.findStation(lastStationId).getConnectionIds()
      lastStationConnections.forEach( id => {
        let newPath = currentPath.concat(id)
        if ( cont(newPath) ) {
          validator(newPath, id)
          queue.push(newPath)
        }
      })
    } while ( queue.length > 0 )
    return result
  }


}

module.exports = Network;