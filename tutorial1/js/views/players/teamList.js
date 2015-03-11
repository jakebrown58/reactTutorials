define([
  'lodash',
  'react',
  'jsx!views/players/playersForTeam'
], function(_, React, PlayersForTeam){
  var TeamList = React.createClass({
    render: function () {
      var players = this.props.players;
      var teams = this.props.teams;

      return (
        <div id="teamList">
          {
            teams.map(function (team) {
              return (
                <PlayersForTeam players={players} team={team}/>
              );
            }.bind(this))
          }
        </div>
      );
    }
  });

  return TeamList;
});