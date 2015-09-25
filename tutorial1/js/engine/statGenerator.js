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

  app.StatGenerator.degredationPath = {a: 'b', b: 'c', c: 'd', d:'e', e: 'e'};
  app.StatGenerator.rankMap = {a: 'star', b: 'regular', c: 'roleplayer', d: 'scrub', e: 'wannabe'};
  app.StatGenerator.skillMap = {speed: 0, throwing: 1, catching: 2, tackling: 3, blocking: 4, dodging: 5, instincts: 6};
  app.StatGenerator.offensivePositions = {
    wr: [0,2,5],
    rb: [5,0,2,6],
    qb: [6,1,5,0],
    ol: [4],
    te: [2,4]
  };
  app.StatGenerator.defensivePositions = {
    dl: [3,4],
    ilb: [0,3,6],
    olb: [0,3],
    cb: [0,3],
    s: [0,2,3,6]
  };
  app.StatGenerator.criticalAttributesByPosition = {
    qb: [6,1,5,0],
    rb: [5,0,2,6],
    wr: [0,2,5],
    te: [2,4],
    ol: [4],
    dl: [3,4],
    ilb: [0,3,6],
    olb: [0,3],
    cb: [0,3],
    s: [0,2,3,6]
  };

  app.StatGenerator.getTrueRank = function(baseRank, skill, position) {
    var positionSkills = app.StatGenerator.offensivePositions[position] ||  app.StatGenerator.defensivePositions[position];
    var positionIsSkilledInThisArea = _.some(positionSkills, function(x) {
      return x === skill;
    });

    if(positionIsSkilledInThisArea) {
      return baseRank;
    }
    var newRank = app.StatGenerator.degredationPath[baseRank];
    newRank = app.StatGenerator.degredationPath[newRank];

    return newRank;
  };

  app.StatGenerator.getStats = function(ratingDistribution, oPosDist, dPosDist, forcedStats) {
    var stats = {},
      statsDistribution;
    app.StatGenerator.oPosDist = oPosDist;
    app.StatGenerator.dPosDist = dPosDist;

    stats.rating = app.ProbabilityResolver.resolve(ratingDistribution);  // rating is | a-e |
    stats.side = forcedStats === undefined ? this.getSide() : forcedStats.side;
    stats.position = forcedStats === undefined ? this.getPosition(stats) : forcedStats.position;
    stats.skills = this.assignSkills(app.StatGenerator.skillMap, stats);
    stats.rating = this.rankMap[stats.rating];
    stats.skill = this.assignOverallSkill(stats);
    return stats;
  }

  app.StatGenerator.assignSkills = function(skillMap, stats) {
    var me = this,
      dist = me.buildStatDistribution(stats.rating);
    return _.map(Object.keys(skillMap), function(x) {
      var tmpRating = app.StatGenerator.getTrueRank(stats.rating, skillMap[x], stats.position);
      dist = me.buildStatDistribution(tmpRating);
      return Math.round(app.ProbabilityResolver.resolve(dist), 0);
    });
  }

  app.StatGenerator.getKeySkills = function(stats) {
    return app.StatGenerator.criticalAttributesByPosition[stats.position];
  }

  app.StatGenerator.assignOverallSkill = function(stats) {
    var keySkills = app.StatGenerator.criticalAttributesByPosition[stats.position],
      sumOfKeySkills = 0;

    _.each(keySkills, function(skill) {
      sumOfKeySkills += Math.abs(stats.skills[skill]);
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

  function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  } 
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
