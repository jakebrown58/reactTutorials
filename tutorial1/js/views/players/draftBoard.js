define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList) {
  
  var DraftBoard = React.createClass({
    render: function () {
      var title = "All Players",
        draftablePlayers = this.props.players.getDraftablePlayers(this.props.teams);
      return (
        <div className={"draft"} id="draftBoard">
          <h4>{title}</h4>
          <PlayerList players={draftablePlayers} onAction={this.props.onPlayerAction} />
        </div>
      );
    }
  });

  return DraftBoard;
});