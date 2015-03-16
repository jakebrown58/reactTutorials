define([
  'lodash',
  'react',
  'models/players',
  'models/teams',
  'jsx!views/mainGamePanel'
], function(_, React, players, teams, MainGameView){
  var mainEngine = {};
  mainEngine.activeViewName = "Draft";

  mainEngine.draftPlayer = function(player) {
    var t = _.filter(teams.teamList, function(team) {
      return _.some(team.players, function(id) {
        return id === player.id;
      });
    });

    if(t.length > 0) {
      _.remove(t[0].players, function(id) {
        return id === player.id;
      });
    } else {
      teams.teamList[0].players.push(player.id);
    }

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