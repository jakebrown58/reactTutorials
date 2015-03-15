define([
  'lodash',
  'react',
  'jsx!views/players/playerDetail'
], function(_, React, PlayerDetail){

  // Component that lists all the players passed into it.
  var PlayerList = React.createClass({
    render: function () {

      return (
        <div className={"playerList"}>
          {
            this.props.players.map(function (player) {
              return (
                <div className={"playerRow"}>
                  <PlayerDetail player={player} onAction={this.props.onAction}/>
                </div>
              );
            }.bind(this))
          }
        </div>
      );
    }
  });

  return PlayerList;
});