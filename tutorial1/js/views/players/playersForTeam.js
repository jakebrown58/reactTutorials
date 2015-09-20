define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList){

  // Component that lists a team name, and its players.
  var PlayersForTeam = React.createClass({
    render: function () {
      var playersForThisTeam = this.props.players.getPlayerByTeam(this.props.team);
      var playerAction = this.props.onAction;

      //playersForThisTeam = _.sortBy(playersForThisTeam, function(p) { return p.position});

      return (
        <div id="draftBoard">
          <h4>{this.props.team.teamName}</h4>
          <PlayerList players={playersForThisTeam} columnFilter={this.props.columnFilter} onAction={playerAction}/>
        </div>
      );
    }
  });

  return PlayersForTeam;
});