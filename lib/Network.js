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
    let pathArray = path.split('-')
    let start = this.findStation(pathArray[0])
    return start.distanceOfPath(pathArray.slice(1, pathArray.length))
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

}

module.exports = Network;