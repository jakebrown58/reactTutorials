define([
  'lodash',
  'react',
], function(_, React){

  var PlayerList = React.createClass({
    render: function () {
      var players = this.props.players;
      
      return (
        <div className="player-list">
          {
            players.map(function (player) {
              return (
                <div key={player.id}>
                  <p>
                    {player.firstName + " " + player.lastName}
                  </p>
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