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

  players.playerList.push({id: 1, firstName: 'William', lastName: 'Armstrong'});
  players.playerList.push({id: 2, firstName: 'Deke', lastName: 'Shepard'});
  players.playerList.push({id: 3, firstName: 'Al', lastName: 'Slayton'});
  players.playerList.push({id: 4, firstName: 'Bean', lastName: 'Pole'});

  return players;
});
