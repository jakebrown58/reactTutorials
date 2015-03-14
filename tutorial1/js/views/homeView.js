define([
  'lodash',
  'react',
  'models/players',
  'models/teams',
  'jsx!views/mainGamePanel'
], function(_, React, players, teams, MainGameView){
  var mainEngine = {};
  mainEngine.activeViewName = "Draft";

  mainEngine.setToView = function(viewName) {
    return function() {
      mainEngine.activeViewName = viewName;
      mainEngine.onChange();
    }
  };

  mainEngine.onChange = function () {
    React.render(
        <MainGameView 
          players={players}
          activeViewName={this.activeViewName}
          onViewClicked={this.setToView('Draft')}
          onViewTeams={this.setToView('Teams')}          
          teams={teams.teamList}/>,
        document.getElementById('content')
    );
  };

  mainEngine.onChange();
});