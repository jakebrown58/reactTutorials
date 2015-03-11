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

  var AllPlayers = React.createClass({
    render: function () {
      var players = this.props.players;
      var teams = this.props.teams;

      return (
        <div className={'span11'} id="allPlayers">
          <h3 className={"underline"}>{activeViewName}</h3>
          <div className={"menu"}>
            <ul id="menu-primary" className={"menu"}>
              <li id="menu-item-draft" className="menu-selected">
                <button className="draft" onClick={this.onDraft} type="button">Draft</button>
              </li>
              <li id="menu-item-standings" className="menu-unselected">
                <button className="standings" onClick={this.onStandings} type="button">Standings</button>
              </li>
            </ul>
          </div>
          <section className="span7" id="main">
            <DraftBoard players={players}/>
            <TeamList players={players} teams={teams}/>
          </section>
        </div>
      );
    }
  });

  homeViewModule.onChange = function () {
    React.render(
        <AllPlayers 
          players={players}
          teams={teams.teamList}/>,
        home
    );
  };

  homeViewModule.onChange();

});