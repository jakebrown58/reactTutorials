define([
  'lodash'
], function(_){
  var players = {
    playerList: [],

    getPlayerByTeam: function(team) {
    	return _.filter(this.playerList, function(player) {
        return _.some(team.players, function(playerId) { 
          return player.id === playerId;
        });
      });
    }
  };

  players.playerList.push({id: 1, firstName: 'Jake', lastName: 'Brown'});
  players.playerList.push({id: 2, firstName: 'Val', lastName: 'Brown'});

  return players;
});