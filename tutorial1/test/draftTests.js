var assert = require("should");
var _ = require("lodash");

var cleanup = function(teams) {
  teams.teamList = [];
}

describe('Draft Engine -', function() {
  it('should assign a player to team 0 when drafted', function() {
    var dreftEngine = require("../js/engine/draftEngine.js").DraftEngine;
    var teams = require("../js/models/teams.js");
  	var t = teams.teamList;
    t.push({id: 1, teamName: 'Cannons', players: []});
		t.push({id: 2, teamName: 'Rockets', players: []});

    assert.equal(0, t[0].players.length);
    assert.equal(0, t[1].players.length);

    var result = dreftEngine.togglePlayerAffiliationWithTeam(teams, {id: 1, skill: "Star", firstName: 'A', lastName: 'A'});

    assert.equal('add', result);
    assert.equal(1, t[0].players.length);
    assert.equal(0, t[1].players.length);

    cleanup(teams);
  });
});

describe('Draft Engine -', function() {
  it('should assign a player to team 0 when drafted', function() {
    var dreftEngine = require("../js/engine/draftEngine.js").DraftEngine;
    var teams = require("../js/models/teams.js");
    var t = teams.teamList;
    t.push({id: 1, teamName: 'Cannons', players: []});
    t.push({id: 2, teamName: 'Rockets', players: []});

    var result = dreftEngine.togglePlayerAffiliationWithTeam(teams, {id: 1, skill: "Star", firstName: 'A', lastName: 'A'});
    result = dreftEngine.togglePlayerAffiliationWithTeam(teams, 
      {id: 2, skill: "Star", firstName: 'B', lastName: 'B'}, 
      t[1]);

    assert.equal('add', result);
    assert.equal(1, t[0].players.length);
    assert.equal(1, t[1].players.length);

    result = dreftEngine.togglePlayerAffiliationWithTeam(teams, {id: 1});

    assert.equal('remove', result);
    assert.equal(0, t[0].players.length);
    assert.equal(1, t[1].players.length);

    cleanup(teams);
  });
});