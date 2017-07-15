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

}

module.exports = Network;