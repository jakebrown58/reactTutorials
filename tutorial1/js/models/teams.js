if(typeof require != 'undefined') {
    // Require server-side-specific modules
}
if(typeof define === 'undefined') {
  define = function() { return {};};
}
// Insert code here


define([
  'lodash'
], function(_){

  teams.teamList.push({id: 1, teamName: 'Columbus Cannons', players: []});
  teams.teamList.push({id: 2, teamName: 'Rochester Rockets', players: []});
  teams.teamList.push({id: 3, teamName: 'Omaha Oligarchs', players: []});
  teams.teamList.push({id: 4, teamName: 'Lexington Lizards', players: []});

  return teams;
});

var teams = {
  teamList: [],
  humanTeamId: 1,
  getTheTeamThatAPlayerPlaysFor: function(player) {
    return  _.filter(this.teamList, function(team) {
      return _.some(team.players, function(id) {
        return id === player.id;
      });
    })
  },
  getAITeams: function() {
    var me = this;
    return _.filter(this.teamList, function(team) { return team.id !== me.humanTeamId;});
  },
  getHumanControlledTeam: function() {
    var targetId = this.humanTeamId;
    return _.first(this.teamList, function(team) { return team.id === targetId;});
  }
};



if(typeof module != 'undefined') {
    module.exports = define;
    module.exports = teams;
}
