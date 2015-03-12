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

  players.playerList.push({id: 1, skill: "Star", firstName: 'William', lastName: 'Armstrong'});
  players.playerList.push({id: 2, skill: "Star", firstName: 'Deke', lastName: 'Shepard'});
  players.playerList.push({id: 3, skill: "Role-player", firstName: 'Al', lastName: 'Slayton'});
  players.playerList.push({id: 4, skill: "Journeyman", firstName: 'Bean', lastName: 'Pole'});

  return players;
});
