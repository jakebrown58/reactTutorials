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
  app.StatGenerator.skillMap = {speed: 0, throwing: 1, catching: 2, tackling: 3, blocking: 4, dodging: 5, instincts: 6};
  app.StatGenerator.offensivePositions = {
    wr: [2,0,5,6],
    rb: [5,0,2,6,4],
    qb: [6,1,5,0],
    ol: [4,6,0],
    te: [2,4,0,6]
  };
  app.StatGenerator.defensivePositions = {
    dl: [4,3,6],
    ilb: [3,6,4,0,2],
    olb: [3,0,5,6,4],
    cb: [5,0,6,2],
    s: [6,0,3,2]
  };

  app.StatGenerator.oPosDist = {
    first: {ok: 1},
    ok: { 'qb': 2, 'rb': 2, 'wr': 2, 'ol': 5, 'te': 1}
  };

  app.StatGenerator.dPosDist = {
    first: {ok: 1},
    ok: { 'dl': 4, 'ilb': 2, 'olb': 2, 'cb': 2, 's': 2}
  };

  app.StatGenerator.getStats = function(ratingDistribution) {
    var stats = {},
      statsDistribution;

    stats.rating = app.ProbabilityResolver.resolve(ratingDistribution);
    statsDistribution = this.buildStatDistribution(stats.rating);
    stats.rating = this.rankMap[stats.rating];
    stats.skills = this.assignSkills(app.StatGenerator.skillMap, statsDistribution);
    stats.side = this.getSide();
    stats.position = this.getPosition(stats);
    stats.skill = this.assignOverallSkill(stats);
    return stats;
  }

  app.StatGenerator.assignSkills = function(skillMap, dist) {
    return _.map(Object.keys(skillMap), function() {
      return Math.round(app.ProbabilityResolver.resolve(dist), 0);
    });
  }

  app.StatGenerator.assignOverallSkill = function(stats) {
    var side = app.StatGenerator.sideSelector(stats.side),
      keySkills = side[stats.position],
      sumOfKeySkills;

    sumOfKeySkills = _.reduce(keySkills, function(acc, skill){
      return acc + stats.skills[skill];
    });


    return _.round(sumOfKeySkills / (keySkills.length), 1);
  }

  app.StatGenerator.getSide = function(skills) {
    return _.random(0, 1) === 0 ? 'o' : 'd';
  }

  app.StatGenerator.sideSelector = function(side) {
    return side === 'o' ? app.StatGenerator.offensivePositions : app.StatGenerator.defensivePositions;
  }

  app.StatGenerator.getPosition = function(stats) {
    var dist = stats.side === 'o' ? app.StatGenerator.oPosDist : app.StatGenerator.dPosDist;

    return app.ProbabilityResolver.resolve(dist);
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
