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
          <PlayerDetail header={true} columnFilter={this.props.columnFilter} onAction={this.props.onAction}/>
          {
            this.props.players.map(function (player) {
              return (
                  <PlayerDetail player={player} columnFilter={this.props.columnFilter} onAction={this.props.onAction}/>
              );
            }.bind(this))
          }
        </div>
      );
    }
  });

  return PlayerList;
});