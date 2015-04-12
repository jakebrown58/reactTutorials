define([
  'lodash',
  'react',
  'engine/draftEngine',
  'models/players',
  'models/teams',
  'jsx!views/mainGamePanel'
], function(_, React, draftEngine, players, teams, MainGameView){
  var mainEngine = {};
  mainEngine.activeViewName = "Draft";

  mainEngine.draftPlayer = function(player) {
    draftEngine.togglePlayerAffiliationWithTeam(teams, player);

    mainEngine.onChange();
  };

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
          onDraftPlayer={this.draftPlayer}
          onViewClicked={this.setToView('Draft')}
          onViewTeams={this.setToView('Teams')}          
          teams={teams.teamList}/>,
        document.getElementById('content')
    );
  };

  mainEngine.onChange();
});