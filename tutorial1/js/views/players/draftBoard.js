define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList){


  var DraftBoard = React.createClass({
    render: function () {
      var players = this.props.players;
      var title = "All Players";
      
      return (
        <div className={"draft"} id="draftBoard">
          <h4>{title}</h4>
          <PlayerList players={players.playerList} />
        </div>
      );
    }
  });

  return DraftBoard;
});