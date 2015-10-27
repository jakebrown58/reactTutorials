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


    this.oByP = _.groupBy(offense.players, function(player) { return player.position });
    this.dByP = _.groupBy(defense.players, function(player) { return player.position });


    while(possessionState.result === '?') {
      possessionState = this.resolvePlay(gameState, possessionState);
    }

    gameState.clock[1]--;

    return gameState;
  };

  app.GamePlayer.resolvePlay = function(gameState, possessionState) {
    var p = this.resolvePlayX(gameState, possessionState);
    console.log(p);

    possessionState.result = 'ok';
    return possessionState;
  }

  app.GamePlayer.getGrouping = function(team) {
    return _.groupBy(offensePlayers, function(player) { return player.position });
  }


  app.GamePlayer.resolvePlayX = function(gameState, possessionState) {
    var playClock = 0,
      offensePlayers = possessionState.offense.players,
      defensePlayers = possessionState.defense.players;

    var oDist = {
      first: {ok: 1},
      ok: { 'spread': 0, 'handoff': 8}
    };

    var dDist = {
      first: {ok: 1},
      ok: { 'blitz': 1, 'run': 2, 'deepCover': 1, 'balanced': 1}
    };

    var oPlay = app.ProbabilityResolver.resolve(oDist);
    var dPlay = app.ProbabilityResolver.resolve(dDist);

    if(oPlay === 'handoff') {
      var oScore = 0;
      var ballCarrier = this.oByP['rb'][0];
      _.each(this.oByP['ol'], function(player) {
        oScore += Math.abs(player.stats.skills[4] + Math.random() * 2); // blocking
      });

      var dScore = 0;
      _.each(this.dByP['dl'], function(player) {
        dScore += Math.abs(player.stats.skills[4] + Math.random() * 2); // blocking
      });

      var blockBonus = oScore - dScore;
      var ret;

      if(blockBonus > 0) {
        ret = this.resolveUnblockedDL(ballCarrier);

        if(ret.tackle) {
          return ret;
        }
        ret = this.resolveLinebackers(ballCarrier);
        
        if(ret.tackle) {
          return ret;
        }
      }
      
      return ret;
    }
  };

  app.GamePlayer.resolveLinebackers = function(ballCarrier) {
    var player = this.getRandomDefenderBySkillWeight('olb', 4);
    return {
      tackle: player[0].playerId,
      rush: ballCarrier.playerId,
      yards: Math.round((15 - Math.random() * 16))
    };
  };

  app.GamePlayer.resolveUnblockedDL = function(ballCarrier) {
      // defense has a free blocker at the line and can try to disrupt the play.
      var unblockedDefenders = this.getUnBlockedDL(this.dByP),
        ret = {};

      _.each(unblockedDefenders, function(player) {
        if(player.stats.skills[3] + Math.random() * 2 > ballCarrier.stats.skills[3] + Math.random() * 2) {
          ret = {
            tackle: player.playerId,
            rush: ballCarrier.playerId,
            yards: Math.round((3 - Math.random() * 6))
          };
        }
      });

      // if(!ret.tackle) {
      //   ret.neutralized = unblockedDefenders;  // overpursued the play / missed tackle.
      // }

      return ret;
  }

  app.GamePlayer.getRandomDefenderBySkillWeight = function(position, skill) {
    var pDist = this.getWeightBySkill(this.dByP[position], function(p) { return p.stats.skills[skill]; }),
      playerId = app.ProbabilityResolver.resolve(pDist);

    return _.filter(this.dByP[position], function(player) { 
      return player.playerId == playerId;
    });
  };

  app.GamePlayer.getUnBlockedDL = function(dByP) {
    return this.getRandomDefenderBySkillWeight('dl', 4);
  };

  app.GamePlayer.getWeightBySkill = function(players, skillSelector) {
    var distribution = {};
    //
    _.each(players, function(player) {
      distribution[player.playerId] = skillSelector(player);
    });

    // returns an object of the form:
    //   { player-1-Id: skillRating, player-2-Id: skillRating}

    return { first: {ok: 1},
      ok: distribution
    }; 
  };  
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
