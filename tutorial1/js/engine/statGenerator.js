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

  app.StatGenerator.getStats = function(distribution) {
    var stats = {},
      distributionMap = {
        first: {ok: 1},
        ok: { '4': 1, '5': 1, '6': 2, '7': 2, '8': 1, '9': 0, '10': 0}
      };

    stats.rating = app.ProbabilityResolver.resolve(distribution);

    if(stats.rating === 'star') {
      distributionMap = app.ProbabilityResolver.modify(distributionMap, { ok_: { '8': 1, '9': 2, '10': 1}});
    }
    if(stats.rating === 'scrub') {
      distributionMap = app.ProbabilityResolver.modify(distributionMap, { ok_: { '3': 1, '4': 4, '5': 4, '6': 2, '7': 1}});
    }    
    if(stats.rating === 'wannabe') {
      distributionMap = app.ProbabilityResolver.modify(distributionMap, { ok_: { '3': 1, '4': 1, '5': 1}});
    }

    stats.skill = app.ProbabilityResolver.resolve(distributionMap);
    return stats;
  }
}())


if(typeof module != 'undefined') {
    module.exports = app;
}
