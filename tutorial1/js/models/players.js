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
  'lodash'
], function(_){
  var players = app.PlayerModule;
  players.playerList.push({id: 1, skill: "Star", firstName: 'William', lastName: 'Armstrong'});
  players.playerList.push({id: 2, skill: "Star", firstName: 'Deke', lastName: 'Shepard'});
  players.playerList.push({id: 3, skill: "Role-player", firstName: 'Al', lastName: 'Slayton'});
  players.playerList.push({id: 4, skill: "Journeyman", firstName: 'Bean', lastName: 'Pole'});

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
