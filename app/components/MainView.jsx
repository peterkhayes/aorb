var React = require("react");
var Firebase = require("../factories/Firebase");

var MainView = React.createClass({
  
  getInitialState: function() {
    return {
      decisions: []
    }
  },

  componentWillMount: function() {
    var that = this;
    that._userDecisionsRef = new Firebase("users", that.props.username, "decisions");
    that._userDecisionsRef.on("child_added", function(snap) {
      new Firebase("decisions", snap.key()).once("value", function(snap) {
        var val = snap.val();
        var newDecisions = (that.state.decisions).concat(val);
        that.setState({decisions: newDecisions});
      });
    });
  },

  componentWillUnmount: function() {
    this._userDecisionsRef.off();
  },

  render: function() {
    var decisions = this.state.decisions.map(function(decision) {
      return <li>{decision.name}</li>
    });
    return (
      <div>
        <button>New Decision</button>
        <button>Friends</button>
        <h1>Your Decisions</h1>
        <ul>
          {decisions}
        </ul>
      </div>
    );
  }
})

module.exports = MainView;