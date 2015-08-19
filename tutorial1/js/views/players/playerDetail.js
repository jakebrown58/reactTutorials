define([
  'lodash',
  'react'
], function(_, React){

  // Component that lists all the players passed into it.
  var PlayerDetail = React.createClass({
    render: function () {
      var player = this.props.player,
          me = this,
          onPlayerActionFn;

      onPlayerActionFn = function() {
          me.props.onAction(me.props.player);
      };


      var bonus = this.props.onAction ? 
        <button className={"playerAction"} onClick={onPlayerActionFn}>Draft</button> :
        <div></div>;

      var statCells = [];
      _.each(player.skills, function(skill) {
        statCells.push(<div className={"playerSkillValue"}>{skill}</div>);
      });

      return (
        <div className="playerRow" key={player.id}>
            <div className={"playerName"}>
              {player.firstName + " " + player.lastName}
            </div>
            <div className={"playerSkill"}>
              {player.rating}
            </div>
            <div className={"playerSkill"}>
              {player.skill}
            </div>
            {statCells}    
            <div className={"playerSkill"}>
            {bonus}
            </div>
        </div>
      );
    }
  });

  return PlayerDetail;
});