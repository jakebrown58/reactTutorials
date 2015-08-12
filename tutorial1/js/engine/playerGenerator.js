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
  'lodash',
  'engine/ptrees',
  'engine/statGenerator'
], function(_, ptrees, statGenerator){
    var playerGenerator = app.PlayerGenerator;
    return playerGenerator;
});

(function () {
  'use strict';

  var nameMaker = {};
  nameMaker.firstNames = ['Andy', 'Brad', 'Chet', 'Doug', 'Earl', 'Frank', 'Gabe', 'Hal', 'Ian', 'Jake', 'Lou', 'Mike', 'Ned'];
  nameMaker.lastNames = ['Anderson', 'Brown', 'Craven', 'Duphrane', 'Ebbits', 'Freemont', 'Garfield', 'Salerno'];

  nameMaker.getFirstName = function() {
    return this.getName(this.firstNames);
  }

  nameMaker.getLastName = function() {
    return this.getName(this.lastNames);
  }

  nameMaker.getName = function(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
  }

  app.PlayerGenerator = {
    seedId: 1,
    initialPlayerDistribution:   {
      first: { good: 1 },
      good: {star: 1, veteran: 2, roleplayer: 3, scrub: 2, wannabe: 1}
    }
  };

  app.PlayerGenerator.createPlayers = function(numberOfPlayers) {
    var players = [],
      me = this;
    _.times(numberOfPlayers, function() { players.push(me.createPlayer())} );
    return _.sortByOrder(players, ['skill', 'lastName'], ['desc', 'asc']);
  };

  app.PlayerGenerator.createPlayer = function(position, archtype) {
    var n = nameMaker,
      stats = app.StatGenerator.getStats(this.initialPlayerDistribution);
    this.seedId++;
    return {id: this.seedId, rating: stats.rating, skill: stats.skill, firstName: n.getFirstName(), lastName: n.getLastName()};
  };
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
