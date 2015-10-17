var assert = require("should");
var _ = require('lodash');
var pTrees = require("../js/engine/ptrees.js");
var code = require("../js/engine/gamePlayer.js");
var gp = code.GamePlayer;

var data = {
    teamA: {
        name: 'A',
        players: [
            {position: 'dl', stats: {skills: [0,0,0,0,0]}}, 
            {position: 'olb', stats: {skills: [0,0,0,0,0]}}
        ]
    },
    teamB: {
        name: 'B',
        players: [
            {position: 'ol', stats: {skills: [0,0,0,0,0]}}, 
            {position: 'rb', stats: {skills: [0,0,0,0,0]}}
        ]
        
    }
};

var testCollection = {
    expressiondelete: function() { return 'I HAVE THE POWER';},
    uncheckAll: function() { return 'USE THE SWORD LION-O';}
};

describe('GamePlayer - ', function() {
    it('playGame ok', function() {
        var result = gp.playGame(data.teamA, data.teamB);
        assert.equal(result.teams[0], data.teamA);
        assert.equal(result.teams[1], data.teamB);
    });
});    

