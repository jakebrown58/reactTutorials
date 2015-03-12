define([
  'lodash',
  'react',
], function(_, React){

  var PlayerList = React.createClass({
    render: function () {
      var players = this.props.players;
      
      return (
        <div className={"playerList"}>
          {
            players.map(function (player) {
              return (
                <div className={"player"} key={player.id}>
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