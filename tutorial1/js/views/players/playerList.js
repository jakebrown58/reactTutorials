define([
  'lodash',
  'react',
], function(_, React){

  // Component that lists all the players passed into it.
  var PlayerList = React.createClass({
    render: function () {
      return (
        <div className={"playerList"}>
          {
            this.props.players.map(function (player) {
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