define([
  'lodash',
  'react',
  'jsx!views/players/playersForTeam'
], function(_, React, PlayersForTeam){

  // Component that lists all of the teams and their players.
  var TeamList = React.createClass({
    render: function () {
      return (
        <div className={"team"} id="teamList">
        <button className={"playerAction"} onClick={this.props.onSortAction}>Sort: {this.props.sortBy} </button>
          {
            this.props.teams.map(function (team) {
              return (
                <PlayersForTeam players={this.props.players} team={team} columnFilter={[this.props.sortBy]} onAction={this.props.onPlayerAction}/>
              );
            }.bind(this))
          }
        </div>
      );
    }
  });

  return TeamList;
});