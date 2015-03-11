define([
  'lodash'
], function(_){
  var teams = {
    teamList: []
  };

  teams.teamList.push({id: 1, teamName: 'Cannons', players: [1]});
  teams.teamList.push({id: 2, teamName: 'Rockets', players: [2]});

  return teams;
});