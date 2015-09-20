define([
  'lodash',
  'react',
  'engine/statGenerator'
], function(_, React, stats){

  // Component that lists all the players passed into it.
  var PlayerDetail = React.createClass({
    render: function () {
      var player = this.props.player,
          me = this,
          onPlayerActionFn,
          filter = me.props.columnFilter;

      onPlayerActionFn = function() {
          me.props.onAction(me.props.player);
      };


      var bonus = this.props.onAction ? 
        <button className={"playerAction"} onClick={onPlayerActionFn}>Draft</button> :
        <div></div>;

      var statCells = player ? _.map(player.skills, function(skill) {
        return (<div className={"playerSkillValue"}>{skill}</div>);
      }) : [];

      if(filter === undefined) {
        statCells = [];
      } else {
        statCells = statCells[stats.skillMap[filter]] || [];
      }

      if(this.props.header === true) {
        player = {
          firstName: 'Name',
          lastName: '',
          rating: 'Rating',
          position: 'Position',
          skill: 'Skill'
        };
        bonus = <div></div>;
        statCells = filter == 'Overall' ? [] : <div className={"playerSkillValue"}>{filter}</div>;
        if(filter === undefined) {
          statCells = [];
          // statCells = _.map(Object.keys(stats.skillMap), function(skill) {
          //   return (<div className={"playerSkillValue"}>{skill}</div>);
          // });
        }
      }

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