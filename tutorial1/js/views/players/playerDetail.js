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

      // var statCells = _.map(player.skills, function(skill) {
      //   return (<div className={"playerSkillValue"}>{skill}</div>);
      // });
      var statCells = [];

      return (
        <div className="playerRow" key={player.id}>
            <div className={"playerName"}>
              {player.firstName + " " + player.lastName}
            </div>
            <div className={"playerSkill"}>
              {player.rating}
            </div>
            <div className={"playerSkill"}>
              {player.position}
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