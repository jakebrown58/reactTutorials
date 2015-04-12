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

  app.DraftEngine.togglePlayerAffiliationWithTeam = function(teams, player, team) { 
    var t = teams.getTheTeamThatAPlayerPlaysFor(player),
      draftTeam = team || teams.getHumanControlledTeam();

    if(t.length > 0) {
      _.remove(draftTeam.players, function(id) {
        return id === player.id;
      });

      return 'remove';
    } else {
      draftTeam.players.push(player.id);
      return 'add';
    }
  };
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
