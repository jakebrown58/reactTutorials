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
    var statGenerator = app.StatGenerator;
    return statGenerator;
});

(function () {
  'use strict';
  app.StatGenerator = {};

  app.StatGenerator.rankMap = {a: 'star', b: 'regular', c: 'roleplayer', d: 'scrub', e: 'wannabe'};
  app.StatGenerator.skillMap = {speed: 0, throwing: 1, catching: 2, tackling: 3, blocking: 4, instincts: 5};

  app.StatGenerator.getStats = function(ratingDistribution) {
    var stats = {},
      skillCount = Object.keys(app.StatGenerator.skillMap).length,
      statsDistribution;

    stats.rating = app.ProbabilityResolver.resolve(ratingDistribution);
    statsDistribution = this.buildStatDistribution(stats.rating);
    stats.rating = this.rankMap[stats.rating];
    stats.skills = [];
    _.times(skillCount, function() { stats.skills.push(app.ProbabilityResolver.resolve(statsDistribution))});
   
    stats.skill = _.round(_.sum(stats.skills) / (stats.skills.length), 1);
    return stats;
  }

  app.StatGenerator.buildStatDistribution = function(rating) {
   var dist = {
      first: {ok: 1},
      ok: { '4': 1, '5': 1, '6': 2, '7': 2, '8': 1, '9': 0, '10': 0}
    };

    if(rating === 'a') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '6': 1, '7': 1, '8': 2, '9': 3, '10': 1}});
    }
    if(rating === 'b') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '5': 2, '6': 4, '7': 4, '8': 3, '9': 2, '10': 1}});
    }
    if(rating === 'c') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '5': 4, '6': 5, '7': 3, '8': 2, '9': 1}});
    }
    if(rating === 'd') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '3': 1, '4': 5, '5': 5, '6': 3, '7': 2, '8': 1}});
    }
    if(rating === 'e') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '3': 1, '4': 1, '5': 1}});
    }

    return dist;
  }
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
