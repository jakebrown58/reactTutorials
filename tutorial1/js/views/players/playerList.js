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
                <div className={"playerRow"} key={player.id}>
                    <div className={"playerName"}>
                      {player.firstName + " " + player.lastName}
                    </div>
                    <div className={"playerSkill"}>
                      {player.skill}
                    </div>
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