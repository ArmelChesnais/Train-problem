var assert = require("chai").assert;

const Network = require('../lib/Network');
const Station = require('../lib/Station');

describe('Network',function(){
  let net = new Network();
  it('Should create a network Object', function() {
    assert.instanceOf(net, Network, 'is an instance of Network');
    assert.notInstanceOf(new Object, Network, 'generic object is not instance of Network')
  });

  it('Should have the correct attributes', function() {
    assert.exists(net.stations, 'has stations attribute');
  });

  net.addStation('A')
  it('Should be able to add a station', function() {
    assert.instanceOf(net.stations['A'], Station, 'has a station')
    assert.equal(net.stations['A'].id, 'A', 'has a station with correct ID')
    assert.notInstanceOf(net.stations['Z'], Station, 'should not have a non-existent station')
  })

  it('Should be able to find a station', function() {
    let statA = net.stations['A']
    assert.equal(net.findStation('A'), statA, 'can find a station');
  });

  let graphNet = new Network('AB1, BC2, CD4, DE8');
  it('Should create a network Object given a graph string', function() {
    assert.instanceOf(graphNet, Network, 'is an instance of Network');
    assert.exists(graphNet.findStation('A'), 'has station A');
    assert.exists(graphNet.findStation('B'), 'has station B');
    assert.exists(graphNet.findStation('E'), 'has station E');
    assert.notExists(graphNet.findStation('Z'), 'does not have station Z');
    assert.equal(graphNet.getDistanceOfPath('A-B-C-D-E'), 15, 'path should be 15')
    assert.equal(graphNet.getDistanceOfPath('E-C-D'), 'NO SUCH ROUTE', 'no such route')

  });

});