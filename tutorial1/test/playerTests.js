var assert = require("should");
var _ = require("lodash");

var cleanup = function(players) {
  players.playerList = [];
}

describe('Players -', function() {
  it('should be able to load the players model', function() {
    var players = require("../js/models/players.js").PlayerModule;
    players.playerList.push({id: 1, skill: "Star", firstName: 'William', lastName: 'Armstrong'});
    players.playerList.push({id: 2, skill: "Star", firstName: 'Deke', lastName: 'Shepard'});
    players.playerList.push({id: 3, skill: "Role-player", firstName: 'Al', lastName: 'Slayton'});
    players.playerList.push({id: 4, skill: "Journeyman", firstName: 'Bean', lastName: 'Pole'});


    assert.equal(4, players.playerList.length);

    cleanup(players);
  });
});