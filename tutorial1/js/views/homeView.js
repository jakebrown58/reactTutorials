define([
  'lodash',
  'react',
  'engine/draftEngine',
  'engine/statGenerator',
  'models/players',
  'models/teams',
  'jsx!views/mainGamePanel'
], function(_, React, draftEngine, statGen, players, teams, MainGameView){
  var mainEngine = {};
  mainEngine.activeViewName = "Draft";
  mainEngine.draftSort = "Overall";
  mainEngine.draftSortIndex = -1;

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

  mainEngine.sortToggle = function() {
    var skillSort = 'skill';
    mainEngine.draftSortIndex++;

    window.console.log(mainEngine.draftSortIndex);

    if(mainEngine.draftSortIndex >= _.keys(statGen.skillMap).length) {
      mainEngine.draftSortIndex = -1;
    }

    if(mainEngine.draftSortIndex === -1) {
      mainEngine.draftSort = 'Overall';
    } else {
      mainEngine.draftSort = _.keys(statGen.skillMap)[mainEngine.draftSortIndex];
      skillSort = 'skills[' + mainEngine.draftSortIndex + ']';
    }


    players.playerList = _.sortBy(players.playerList, function(p) { 
      return mainEngine.draftSortIndex === -1 ? p.skill * -1 : Math.abs(p.skills[mainEngine.draftSortIndex]) * -1;
    });
    mainEngine.onChange();
  }

  mainEngine.onChange = function () {
    React.render(
        <MainGameView 
          players={players}
          activeViewName={this.activeViewName}
          draftSort={this.draftSort}
          onSortToggle={this.sortToggle}
          onDraftPlayer={this.draftPlayer}
          onViewClicked={this.setToView('Draft')}
          onViewTeams={this.setToView('Teams')}          
          teams={teams.teamList}/>,
        document.getElementById('content')
    );
  };

  mainEngine.onChange();
});