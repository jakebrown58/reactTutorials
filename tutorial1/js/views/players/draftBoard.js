define([
  'lodash',
  'react',
  'jsx!views/players/playerList'
], function(_, React, PlayerList) {
  
  var DraftBoard = React.createClass({
    render: function () {
      var title = "Free Agents",
        draftablePlayers = this.props.players.getDraftablePlayers(this.props.teams),
        columnFilter = [this.props.sortBy];

      draftablePlayers = _.filter(draftablePlayers, this.props.filterByFn);
      return (
        <div className={"draft"} id="draftBoard">
          <h4>{title}</h4>
          <button className={"listAction"} onClick={this.props.onSortAction}>Sort: {this.props.sortBy} </button>
          <button className={"listAction"} onClick={this.props.onFilterAction}>Filter: {this.props.filterBy.filterKey + " - " + this.props.filterBy.filterValue} </button>
          <PlayerList players={draftablePlayers} columnFilter={columnFilter} onAction={this.props.onPlayerAction} />
        </div>
      );
    }
  });

  return DraftBoard;
});