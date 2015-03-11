define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList){


  var PlayersForTeam = React.createClass({
    render: function () {
      var players = this.props.players;
      var team = this.props.team;
      var pByT = players.getPlayerByTeam(team);

      return (
        <div id="draftBoard">
          <h4>{team.teamName}</h4>
          <PlayerList players={pByT} />
        </div>
      );
    }
  });

  return PlayersForTeam;
});