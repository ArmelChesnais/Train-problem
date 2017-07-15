// test_trains.js

var assert = require("chai").assert;

const Network = require('../lib/Network');
const Station = require('../lib/Station');

const net = new Network('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7')

describe('Trains problems',function(){
  it('1. The distance of the route A-B-C.', function() {
    assert.equal(net.getDistanceOfPath('A-B-C'), 9, 'Output #1: 9');
  });
  it('2. The distance of the route A-D.', function() {
    assert.equal(net.getDistanceOfPath('A-D'), 5, 'Output #2: 5');
  });
  it('3. The distance of the route A-D-C.', function() {
    assert.equal(net.getDistanceOfPath('A-D-C'), 13, 'Output #3: 13');
  });
  it('4. The distance of the route A-E-B-C-D.', function() {
    assert.equal(net.getDistanceOfPath('A-E-B-C-D'), 22, 'Output #4: 22');
  });
  it('5. The distance of the route A-E-D.', function() {
    assert.equal(net.getDistanceOfPath('A-E-D'), 'NO SUCH ROUTE', 'Output #5: NO SUCH ROUTE');
  });
  it('6. The number of trips starting at C and ending at C with a maximum of 3 stops.', function() {
    assert.equal(null, 2, 'Output #6: 2');
  });
  it('7. The number of trips starting at A and ending at C with exactly 4 stops.', function() {
    assert.equal(null, 3, 'Output #6: 2');
  });
  it('8. The length of the shortest route (in terms of distance to travel) from A to C.', function() {
    assert.equal(null, 9, 'Output #6: 2');
  });
  it('9. The length of the shortest route (in terms of distance to travel) from B to B.', function() {
    assert.equal(null, 9, 'Output #6: 2');
  });
  it('10. The number of different routes from C to C with a distance of less than 30.', function() {
    assert.equal(null, 7, 'Output #6: 2');
  });
});