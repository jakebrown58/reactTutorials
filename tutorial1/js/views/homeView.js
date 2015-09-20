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
  mainEngine.filter = {
    filterKey: 'no filter',
    filterValue: ''
  }

  mainEngine.draftPlayer = function(player) {
    draftEngine.togglePlayerAffiliationWithTeam(teams, player);
    draftEngine.aiPicks(teams, players);
    mainEngine.onChange();
  };

  mainEngine.releasePlayer = function(player) {
    draftEngine.togglePlayerAffiliationWithTeam(teams, player);
    mainEngine.onChange();
  }

  mainEngine.onFilterToggle = function(player) {
    console.log("1: "+ mainEngine.filter.filterKey);
    if(mainEngine.filter.filterKey === 'no filter') {
      mainEngine.filter.filterKey = 'position';
    }
    if(mainEngine.filter.filterKey === 'position') {
      if(mainEngine.filter.filterIndex === undefined) {
        mainEngine.filter.filterIndex = -1;
      }
      mainEngine.filter.filterIndex = mainEngine.filter.filterIndex + 1;
      mainEngine.filter.filterValue = Object.keys(app.StatGenerator.criticalAttributesByPosition)[mainEngine.filter.filterIndex];
      if(mainEngine.filter.filterValue === undefined) {
        mainEngine.filter.filterKey = 'no filter';
        mainEngine.filter.filterValue = '';
        mainEngine.filter.filterIndex = -1;
      }
    }
    console.log("2:" + mainEngine.filter.filterKey);
    
    mainEngine.onChange();
  };

  mainEngine.filterByFn = function(player) {
    var me = this;
    if(mainEngine.filter.filterKey === 'no filter') { return true; }
    return player[mainEngine.filter.filterKey] === mainEngine.filter.filterValue;
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
          filterBy={this.filter}
          filterByFn={this.filterByFn}
          onFilterToggle={this.onFilterToggle}
          onSortToggle={this.sortToggle}
          onDraftPlayer={this.draftPlayer}
          onReleasePlayer={this.releasePlayer}
          onViewClicked={this.setToView('Draft')}
          onViewTeams={this.setToView('Teams')}          
          teams={teams.teamList}/>,
        document.getElementById('content')
    );
  };

  mainEngine.onChange();
});