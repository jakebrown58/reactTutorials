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

  app.StatGenerator.getStats = function(ratingDistribution) {
    var stats = {},
      statsDistribution;

    stats.rating = app.ProbabilityResolver.resolve(ratingDistribution);
    statsDistribution = this.buildStatDistribution(stats.rating);
    stats.rating = this.rankMap[stats.rating];
    stats.skills = [];
    _.times(5, function() { stats.skills.push(app.ProbabilityResolver.resolve(statsDistribution))});


    
    stats.skill = _.round(_.sum(stats.skills) / (stats.skills.length), 2);
    return stats;
  }

  app.StatGenerator.buildStatDistribution = function(rating) {
   var dist = {
      first: {ok: 1},
      ok: { '4': 1, '5': 1, '6': 2, '7': 2, '8': 1, '9': 0, '10': 0}
    };

    if(rating === 'a') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '8': 1, '9': 2, '10': 1}});
    }
    if(rating === 'b') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '5': 2, '6': 4, '7': 4, '8': 3, '9': 2}});
    }
    if(rating === 'c') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '5': 4, '6': 4, '7': 3, '8': 1, '9': 1}});
    }
    if(rating === 'd') {
      dist = app.ProbabilityResolver.modify(dist, { ok_: { '3': 1, '4': 4, '5': 4, '6': 2, '7': 1}});
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
