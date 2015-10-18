var assert = require("should");
var _ = require('lodash');
var pTrees = require("../js/engine/ptrees.js");
var code = require("../js/engine/gamePlayer.js");
var gp = code.GamePlayer;

var data = {
    teamA: {
        name: 'A',
        players: [
            {playerId: 1, position: 'dl', stats: {skills: [0,0,0,0,1]}}, 
            {playerId: 2, position: 'dl', stats: {skills: [0,0,0,0,2]}}, 
            {playerId: 3, position: 'dl', stats: {skills: [0,0,0,0,3]}}, 
            {playerId: 4, position: 'dl', stats: {skills: [0,0,0,0,4]}}, 
            {playerId: 5, position: 'dl', stats: {skills: [0,0,0,0,5]}}, 
            {playerId: 6, position: 'olb', stats: {skills: [0,0,0,0,0]}}
        ]
    },
    teamB: {
        name: 'B',
        players: [
            {playerId: 10, position: 'ol', stats: {skills: [0,0,0,0,1]}}, 
            {playerId: 11, position: 'ol', stats: {skills: [0,0,0,0,2]}}, 
            {playerId: 12, position: 'ol', stats: {skills: [0,0,0,0,3]}}, 
            {playerId: 13, position: 'ol', stats: {skills: [0,0,0,0,4]}}, 
            {playerId: 14, position: 'ol', stats: {skills: [0,0,0,0,5]}}, 
            {playerId: 15, position: 'rb', stats: {skills: [0,0,0,0,0]}}
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

