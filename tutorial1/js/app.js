// Filename: app.js
define([ 
  'lodash', 
  'react',
  'router'
], function(_, React, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});