define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList){


  var AllPlayers = React.createClass({
    render: function () {
      var title = "All Players";

      return (
        <div className={"draft"} id="draftBoard">
          <h4>{title}</h4>
          <PlayerList players={this.props.players.playerList} />
        </div>
      );
    }
  });

  return DraftBoard;
});