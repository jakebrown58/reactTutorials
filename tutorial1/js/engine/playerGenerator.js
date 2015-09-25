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
    app.PlayerGenerator.teamCountHACK = 4;
    return playerGenerator;
});

(function () {
  'use strict';

  var nameMaker = {};
  nameMaker.firstNames = ['Andy', 'Brad', 'Chet', 'Doug', 'Earl', 'Frank', 'Gabe', 'Hal', 'Ian', 'Jake', 'Lou', 'Mike', 'Ned', 'Pete', 'Rick', 'Stan', 'Ted', 'Vince', 'Will'];
  nameMaker.lastNames = ['Anderson', 'Brown', 'Craven', 'Duphrane', 'Ebbits', 'Freemont', 'Garfield', 'Harrison', 'Ivanov', 'Jenkins', 'Kirkland', 'Lucas', 'Salerno'];

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
      good: {a: 2, b: 3, c: 4, d: 3, e: 1}
    },
    oPosDist: {
      first: {ok: 1},
      ok: { 'qb': 2, 'rb': 2, 'wr': 2, 'ol': 5, 'te': 1}
    },
    dPosDist: {
      first: {ok: 1},
      ok: { 'dl': 4, 'ilb': 2, 'olb': 2, 'cb': 2, 's': 2}
    }
  };

  app.PlayerGenerator.createPlayers = function(numberOfPlayers) {
    var players = [],
      me = this;
    _.each(Object.keys(me.oPosDist.ok), function(position) {
      _.times(me.oPosDist.ok[position] * app.PlayerGenerator.teamCountHACK, function() { players.push(me.createPlayer({position: position, side: 'o'}))});
    });
    _.each(Object.keys(me.dPosDist.ok), function(position) {
      _.times(me.dPosDist.ok[position] * app.PlayerGenerator.teamCountHACK, function() { players.push(me.createPlayer({position: position, side: 'd'}))});
    });    
    _.times(numberOfPlayers, function() { players.push(me.createPlayer())} );
    return _.sortByOrder(players, ['skill', 'lastName'], ['desc', 'asc']);
  };

  app.PlayerGenerator.createPlayer = function(cfg) {
    var n = nameMaker,
      forceStats = cfg === undefined ? undefined : { position: cfg.position, side: cfg.side},
      stats;
    stats = app.StatGenerator.getStats(this.initialPlayerDistribution, this.oPosDist, this.dPosDist, forceStats);
    this.seedId++;
    return {id: this.seedId, position: stats.position, rating: stats.rating, skill: stats.skill, skills: stats.skills, firstName: n.getFirstName(), lastName: n.getLastName()};
  };
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
