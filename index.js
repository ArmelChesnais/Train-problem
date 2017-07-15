'use strict';

// index.js

const Network = require('./lib/Network');
const Station = require('./lib/Station');

const net = new Network('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7')

console.log(net.getDistanceOfPath('A-B-C'))
console.log(net.getDistanceOfPath('A-D'))
console.log(net.getDistanceOfPath('A-D-C'))
console.log(net.getDistanceOfPath('A-E-B-C-D'))
console.log(net.getDistanceOfPath('A-E-D'))