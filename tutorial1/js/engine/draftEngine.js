if(typeof define === 'undefined') {
  define = function() { return {};};
}
if(typeof _ === 'undefined') {
  _ = require("lodash");
}
if(typeof app === 'undefined') {
  app = {};
}

define([
  'lodash'
], function(_){
    var draftEngine = app.DraftEngine;
    return draftEngine;
});

(function () {
  'use strict';

  app.DraftEngine = {
  };

  app.DraftEngine.draftLog = [];

  app.DraftEngine.logPick = function(team, player) {
    app.DraftEngine.draftLog.push(team.name + ' selects ' + player.position + ' - ' + player.name + ' - ' + player.id);
  }

  app.DraftEngine.togglePlayerAffiliationWithTeam = function(teams, player, team) { 
    var t = teams.getTheTeamThatAPlayerPlaysFor(player),
      draftTeam = team || teams.getHumanControlledTeam();

    // console.log('t: ' + t);
    if(t.length > 0) {
      _.remove(draftTeam.players, function(id) {
        return id === player.id;
      });

      return 'remove';
    } else {
      draftTeam.players.push(player.id);
      this.logPick(draftTeam, player);
      return 'add';
    }
  };

  app.DraftEngine.aiPicks = function(teams, players) {
    var aiTeams = teams.getAITeams(),
      me = this;
    _.each(aiTeams, function(t){
      var available = players.getDraftablePlayers(teams.teamList);
      console.log("a:" + available.length);
      me.togglePlayerAffiliationWithTeam(teams, available[0], t);
    });
  };
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
