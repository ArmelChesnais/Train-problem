var assert = require("chai").assert;

const Station = require('../lib/Station');

describe('Station',function(){
  it('Should create a station Object', function() {
    let stat = new Station();
    assert.instanceOf(stat, Station, 'is an instance of Station');
    assert.notInstanceOf(new Object, Station, 'generic object is not instance of Station')
  });

  let statA = new Station('A');
  it('Should have the correct attributes', function() {
    assert.equal(statA.id, 'A', 'id should be A');
    assert.exists(statA.connections, 'should have connections')
  });

  let statB = new Station('B')
  statA.addConnection(statB, 4)
  it('Should be able to add connections', function() {
    assert.exists(statA.connections['B'], 'should have connection to B')
    assert.notExists(statA.connections['Z'], "should not have connections that don't exist")
    assert.equal(statA.distanceTo('B'), 4, 'distance to B should be 4')
  });

  it('Should find a connection', function() {
    assert.exists(statA.connections['B'], 'should have connection to B')
    assert.notExists(statA.connections['Z'], "should not have connections that don't exist")
    assert.equal(statA.distanceTo('B'), 4, 'distance to B should be 4')
  });

  let statC = new Station('C')
  statB.addConnection(statC, 2)
  statC.addConnection(new Station('D'), 1)
  it('Should find path length', function() {
    assert.equal(statA.distanceOfPath(['B']), 4, 'Path A-B should be 4')
    assert.equal(statB.distanceOfPath(['C']), 2, 'Path B-C should be 2')
    assert.equal(statC.distanceOfPath(['D']), 1, 'Path B-C should be 1')
    assert.equal(statA.distanceOfPath(['C']), 'NO SUCH ROUTE', 'Path B-C should indicate "NO SUCH ROUTE"')
    assert.equal(statA.distanceOfPath(['B', 'C', 'D']), 7, 'Path A-B-C-D should be 7')
  });

});