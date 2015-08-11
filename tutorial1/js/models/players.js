if(typeof require != 'undefined') {
    // Require server-side-specific modules
}
if(typeof define === 'undefined') {
  define = function() { return {};};
}
if(typeof app === 'undefined') {
  app = {};
}


define([
  'lodash',
  'engine/playerGenerator'
], function(_, playerGenerator){
  var players = app.PlayerModule;
  _.each(playerGenerator.createPlayers(40), function(x) {players.playerList.push(x)});
  return players;
});

(function () {
  'use strict';

  app.PlayerModule = {
    playerList: [],

    getPlayerByTeam: function(team) {
      return _.filter(app.PlayerModule.playerList, function(player) {
        return _.some(team.players, function(playerId) { 
          return player.id === playerId;
        });
      });
    },

    isPlayerOnTeam: function(player, team) {
      return _.some(team.players, function(id) { return id === player.id;}
      );
    },

    isPlayerOnAnyTeam: function(teams, player) {
      return !_.some(teams, function(team) {
        return app.PlayerModule.isPlayerOnTeam(player, team);
      });
    },
    
    getDraftablePlayers: function(teams) {
      var isOnAnyTeam = _.curry(app.PlayerModule.isPlayerOnAnyTeam)(teams);
      return _.filter(app.PlayerModule.playerList, isOnAnyTeam);
    }
  };
}());

if(typeof module != 'undefined') {
    module.exports = app;
}
