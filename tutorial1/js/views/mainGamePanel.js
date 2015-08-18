define([
  'react',
  'jsx!views/players/draftBoard',
  'jsx!views/players/teamList'
], function(React, DraftBoard, TeamList){

  var MainGameView = React.createClass({
    render: function () {
      var view = null,
        me = this;

      if(this.props.activeViewName === "Draft") {
        view = <DraftBoard players={this.props.players} teams={this.props.teams} sortBy={this.props.draftSort} onSortAction={this.props.onSortToggle} onPlayerAction={this.props.onDraftPlayer}/>
      }
      if(this.props.activeViewName === "Teams") {
        view = <TeamList players={this.props.players} teams={this.props.teams}/>;
      }

      return (
        <div className={"home"} id="allPlayers">
          <div className={"mainMenu"}>
            <button className={"mainMenuItem"} onClick={this.props.onViewClicked}>Draft</button>
            <button className={"mainMenuItem"} onClick={this.props.onViewTeams}>Teams</button>
          </div>
          <section className={"main"} id="main">
            {view}
          </section>
        </div>
      );
    }
  });

  return MainGameView;
});