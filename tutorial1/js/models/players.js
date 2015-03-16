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
    },

    isPlayerOnTeam: function(player, team) {
      return _.some(team.players, function(id) { return id === player.id;}
      );
    },

    isPlayerOnAnyTeam: function(teams, player) {
      return !_.some(teams, function(team) {
        return players.isPlayerOnTeam(player, team);
      });
    },
    
    getDraftablePlayers: function(teams) {
      var isOnAnyTeam = _.curry(players.isPlayerOnAnyTeam)(teams);
      return _.filter(players.playerList, isOnAnyTeam);
    }

  };

  players.playerList.push({id: 1, skill: "Star", firstName: 'William', lastName: 'Armstrong'});
  players.playerList.push({id: 2, skill: "Star", firstName: 'Deke', lastName: 'Shepard'});
  players.playerList.push({id: 3, skill: "Role-player", firstName: 'Al', lastName: 'Slayton'});
  players.playerList.push({id: 4, skill: "Journeyman", firstName: 'Bean', lastName: 'Pole'});

  for(var i = players.playerList.length; i < 50; i++) {
   players.playerList.push(
    {
      id: players.playerList.length, 
      skill: "Journeyman", 
      firstName: 'Bob-' + players.playerList.length, 
      lastName: 'Smith'
    });
 };

  return players;
});
