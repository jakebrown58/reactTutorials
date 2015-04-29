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

  teams.teamList.push({id: 1, teamName: 'Cannons', players: [1]});
  teams.teamList.push({id: 2, teamName: 'Rockets', players: [2]});

  return teams;
});

var teams = {
  teamList: [],
  humanTeamId: 0,
  getTheTeamThatAPlayerPlaysFor: function(player) {
    return  _.filter(this.teamList, function(team) {
      return _.some(team.players, function(id) {
        return id === player.id;
      });
    })
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
