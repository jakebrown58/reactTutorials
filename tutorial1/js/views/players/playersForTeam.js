define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList){

  // Component that lists a team name, and its players.
  var PlayersForTeam = React.createClass({
    render: function () {
      var playersForThisTeam = this.props.players.getPlayerByTeam(this.props.team);

      return (
        <div id="draftBoard">
          <h4>{this.props.team.teamName}</h4>
          <PlayerList players={playersForThisTeam} />
        </div>
      );
    }
  });

  return PlayersForTeam;
});