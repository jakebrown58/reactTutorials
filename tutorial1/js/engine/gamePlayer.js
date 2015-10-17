if(typeof define === 'undefined') {
  define = function() { return {};};
}
if(typeof _ === 'undefined') {
  _ = require("lodash");
}
if(typeof app === 'undefined') {
  app = {};
}

define([
  'lodash',
  'engine/ptrees'
], function(_, ptrees){
    var gamePlayer = app.GamePlayer;
    return gamePlayer;
});

(function () {
  'use strict';

  app.GamePlayer = {
  };

  app.GamePlayer.playGame = function(homeTeam, awayTeam) {
    var gameState = {
      teams: [homeTeam, awayTeam],
      possession: awayTeam,
      los: [20],
      score: [0, 0],
      clock: [0, 20],
      stats: {}
    };

    while(gameState.clock[1] > 0) {
      this.resolvePossession(gameState);
    }

    return gameState;
  };

  app.GamePlayer.resolvePossession = function(gameState) {
    var teams = gameState.teams, 
      offense = teams[0] === gameState.possession ? teams[0] : teams[1],
      defense = offense === teams[1] ? teams[0] : teams[1],
      possessionState = {
        offense: offense,
        defense: defense,
        result: '?',
        possesionStats: {}
      };

    while(possessionState.result === '?') {
      possessionState = this.resolvePlay(gameState, possessionState);
    }

    gameState.clock[1]--;

    return gameState;
  };

  app.GamePlayer.resolvePlay = function(gameState, possessionState) {
    this.resolvePlayX(gameState, possessionState);
    possessionState.result = 'ok';
    return possessionState;
  }

  app.GamePlayer.resolvePlayX = function(gameState, possessionState) {
    var playClock = 0,
      offensePlayers = possessionState.offense.players,
      defensePlayers = possessionState.defense.players;

    var oByP = _.groupBy(offensePlayers, function(player) { return player.position });
    var dByP = _.groupBy(defensePlayers, function(player) { return player.position });

    var oDist = {
      first: {ok: 1},
      ok: { 'spread': 1, 'handoff': 1}
    };

    var dDist = {
      first: {ok: 1},
      ok: { 'blitz': 1, 'run': 2, 'deepCover': 1, 'balanced': 1}
    };

    var oPlay = app.ProbabilityResolver.resolve(oDist);
    var dPlay = app.ProbabilityResolver.resolve(dDist);

    if(oPlay === 'handoff') {
      var oScore = 0;
      var ballCarrier = oByP['rb'][0];
      _.each(oByP['ol'], function(player) {
        oScore += Math.abs(player.stats.skills[4] + Math.random() * 2); // blocking
      });

      var dScore = 0;
      _.each(dByP['dl'], function(player) {
        dScore += Math.abs(player.stats.skills[4]) + Math.random() * 2; // blocking
      });

      var blockBonus = oScore - dScore;

      if(blockBonus < -2) {
        // defense has a free blocker at the line and can try to disrupt the play.
        var x = {};
        _.each(dByP['dl'], function(player) {
          x[player.id] = player.stats.skills[4];
        });

        var freeDefenderDist = { first: {ok: 1},
          ok: x
        };

        var playerId = app.ProbabilityResolver.resolve(ratingDistribution);
        var freeDefender = _.find(defensePlayers, function(player) { return player.id === playerId});
        
      }
    }
  };
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
