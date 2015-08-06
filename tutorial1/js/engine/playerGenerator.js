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
  };

  app.PlayerGenerator.createPlayers = function(numberOfPlayers) {
    var players = [];
    var n = nameMaker;
    players.push({id: 1, rating: "Potential all-star", firstName: n.getFirstName(), lastName: n.getLastName()});
    players.push({id: 2, rating: "Potential all-star", firstName: n.getFirstName(), lastName: n.getLastName()});
    players.push({id: 3, rating: "Role-player", firstName: n.getFirstName(), lastName: n.getLastName()});
    players.push({id: 4, rating: "Journeyman", firstName: n.getFirstName(), lastName: n.getLastName()});
    return players;
  };


}())


if(typeof module != 'undefined') {
    module.exports = app;
}
