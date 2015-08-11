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
  'engine/ptrees'
], function(_, ptrees){
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

  var statGen = {};
  statGen.distribution = {
    first: { good: 1 },
    good: {star: 1, veteran: 2, roleplayer: 3, scrub: 2, wannabe: 1}
  };
  
  statGen.getStats = function() {
    return app.ProbabilityResolver.resolve(statGen.distribution);
  }

  app.PlayerGenerator = {
    seedId: 1
  };

  app.PlayerGenerator.createPlayers = function(numberOfPlayers) {
    var players = [],
      me = this;
    _.times(numberOfPlayers, function() { players.push(me.createPlayer())} );
    return players;
  };

  app.PlayerGenerator.createPlayer = function(position, archtype) {
    var n = nameMaker;
    this.seedId++;
    return {id: this.seedId, rating: statGen.getStats(), firstName: n.getFirstName(), lastName: n.getLastName()};
  };


}())


if(typeof module != 'undefined') {
    module.exports = app;
}
