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

  players.playerList.push({id: 1, firstName: 'Player1', lastName: 'SomeLastName'});
  players.playerList.push({id: 2, firstName: 'Player2', lastName: 'SomeOtherLastName'});

  return players;
});
