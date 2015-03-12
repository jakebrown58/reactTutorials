define([
  'lodash',
  'react',
  'models/players',
  'models/teams',
  'jsx!views/players/draftBoard',
  'jsx!views/players/teamList',
  'jsx!views/players/playersForTeam'
], function(_, React, players, teams, DraftBoard, TeamList, PlayersForTeam){


  var home = document.getElementById('content');
  var homeViewModule = {};
  var activeViewName = "Draft";
  var nextViewName = "Teams";

  var setToView = function(viewName) {
    return function() {
      activeViewName = viewName;
      homeViewModule.onChange();
    }
  };

  var AllPlayers = React.createClass({

    render: function () {
      var players = this.props.players;
      var teams = this.props.teams;
      var view = null;

      if(activeViewName === "Draft") {
        view = <DraftBoard players={players}/>
      }
      if(activeViewName === "Teams") {
        view = <TeamList players={players} teams={teams}/>;
      }

      return (
        <div className={"home"} id="allPlayers">
          <div className={"mainMenu"}>
            <button className={"mainMenuItem"} onClick={this.props.onViewClicked}>Draft</button>
            <button className={"mainMenuItem"} onClick={this.props.onViewTeams}>Teams</button>
          </div>
          <section className={"main"} id="main">
            {view}
          </section>
        </div>
      );
    }
  });

  homeViewModule.onChange = function () {
    var viewDraftBoard = _.curry(setToView)('Draft');
    var viewTeams = _.curry(setToView)('Teams');
    React.render(
        <AllPlayers 
          players={players}
          onViewClicked={viewDraftBoard}
          onViewTeams={viewTeams}          
          teams={teams.teamList}/>,
        home
    );
  };

  homeViewModule.onChange();

});