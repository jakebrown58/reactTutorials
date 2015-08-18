define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList) {
  
  var DraftBoard = React.createClass({
    render: function () {
      var title = "Free Agents",
        draftablePlayers = this.props.players.getDraftablePlayers(this.props.teams);
      return (
        <div className={"draft"} id="draftBoard">
          <h4>{title}</h4>
          <button className={"playerAction"} onClick={this.props.onSortAction}>Sort: {this.props.sortBy} </button>
          <PlayerList players={draftablePlayers} onAction={this.props.onPlayerAction} />
        </div>
      );
    }
  });

  return DraftBoard;
});