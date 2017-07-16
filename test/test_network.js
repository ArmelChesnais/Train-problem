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

  describe('Network created with graph string', function(){
    let graphNet = new Network('AB1, BC2, CD4, DE8');
    it('Should create a network Object given a graph string', function() {
      assert.instanceOf(graphNet, Network, 'is an instance of Network');
      assert.exists(graphNet.findStation('A'), 'has station A');
      assert.exists(graphNet.findStation('B'), 'has station B');
      assert.exists(graphNet.findStation('E'), 'has station E');
      assert.notExists(graphNet.findStation('Z'), 'does not have station Z');
    });
    it('Should find the distance of paths', function(){
      assert.equal(graphNet.getDistanceOfPath('A-B-C-D-E'), 15, 'path should be 15')
      assert.equal(graphNet.getDistanceOfPath('E-C-D'), 'NO SUCH ROUTE', 'no such route')
    });
    it('Should find the number of paths to a max number of stops', function() {
      assert.equal(graphNet.numPathsToMaxStops('A', 'B', 1), 1, 'num paths A->B 1 step is 1')
      assert.equal(graphNet.numPathsToMaxStops('A', 'B', 9), 1, 'num paths A->B 9 step is 1')
      assert.equal(graphNet.numPathsToMaxStops('A', 'C', 1), 0, 'num paths A->C 1 step is 0')
      assert.equal(graphNet.numPathsToMaxStops('A', 'C', 2), 1, 'num paths A->C 2 step is 1')
    });
    it('Should find the number of paths to an exact number of stops', function() {
      assert.equal(graphNet.numPathsToExactStops('A', 'B', 1), 1, 'num paths A->B 1 step is 1')
      assert.equal(graphNet.numPathsToExactStops('A', 'B', 9), 0, 'num paths A->B 9 step is 0')
      assert.equal(graphNet.numPathsToExactStops('A', 'C', 1), 0, 'num paths A->C 1 step is 0')
      assert.equal(graphNet.numPathsToExactStops('A', 'C', 2), 1, 'num paths A->C 2 step is 1')
      assert.equal(graphNet.numPathsToExactStops('A', 'C', 3), 0, 'num paths A->C 2 step is 0')
    });
    it('should find the shortest route distance', function() {
      assert.equal(graphNet.shortestRouteDistance('A', 'B'), 1, 'shortest A->B id 1')
      assert.equal(graphNet.shortestRouteDistance('B', 'C'), 2, 'shortest B->C id 2')
      assert.equal(graphNet.shortestRouteDistance('A', 'C'), 3, 'shortest A->C id 3')
    })
  });

  describe('Network using question values', function() {
    let questNet = new Network('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
    it('should find the number of paths to a max number of stops', function() {
      assert.equal(questNet.numPathsToMaxStops('E', 'A', 10), 0, 'num paths E->A 10 step is 0')
      assert.equal(questNet.numPathsToMaxStops('A', 'E', 4), 7, 'num paths A->E 4 step is 7')
      assert.equal(questNet.numPathsToMaxStops('A', 'E', 1), 1, 'num paths A->E 1 step is 1')
      assert.equal(questNet.numPathsToMaxStops('A', 'E', 2), 2, 'num paths A->E 2 step is 2')
    });
    it('should find the shortest route distance', function() {
      assert.equal(questNet.shortestRouteDistance('A', 'B'), 5, 'shortest A->B id 5')
      assert.equal(questNet.shortestRouteDistance('B', 'C'), 4, 'shortest B->C id 4')
      assert.equal(questNet.shortestRouteDistance('A', 'C'), 9, 'shortest A->C id 9')
    })
  });
});