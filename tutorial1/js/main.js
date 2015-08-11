require.config({
  paths: {
    lodash: 'libs/lodash/lodash.min',
    react: 'libs/react/react-with-addons.min',
    JSXTransformer: 'libs/react/JSXTransformer',
    jsx: "libs/react/plugins/JSX-requires"
  }
});


require([
  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});