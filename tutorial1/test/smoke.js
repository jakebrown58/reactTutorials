var assert = require("should");
var demoCode = require("../js/engine/draftEngine.js");
var _ = require("lodash");


describe('Test Framework -', function() {
  it('should be able to load the files and run some code', function() {
    var x = demoCode.DraftEngine.togglePlayerAffiliationWithTeam;
    assert.exist(x);
  });
});