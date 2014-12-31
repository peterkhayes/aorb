var React = require("react");
var Firebase = require("../factories/Firebase");
var FriendView = require('./FriendView.jsx');
var async = require("async");

var MainView = React.createClass({
  
  getInitialState: function() {
    return {
      decisions: [],
      currentDecision: null,
      viewFriends: false 
    }
  },

  componentWillMount: function() {
    var that = this;
    that._userRef = new Firebase("users", that.props.username);
    that._userRef.on("value", function(snap) {
      var val = snap.val();
      var decisions = Object.keys(val.decisions);
      var friends = Object.keys(val.friends);
      async.map(decisions, function(decision, cb) {
        new Firebase("decisions", decision).once("value", function(snap) {
          return cb(null, snap.val());
        });
      }, function(err, decisions) {
        that.setState({
          decisions: decisions,
          friends: friends
        });
      });
    });
    // that._userRef.child("decisions").on("child_added", function(snap) {
    //   new Firebase("decisions", snap.key()).once("value", function(snap) {
    //     var val = snap.val();
    //     var newDecisions = (that.state.decisions).concat(val);
    //     that.setState({decisions: newDecisions});
    //   });
    // });
    // that._userRef.child("friends")
  },

  componentWillUnmount: function() {
    this._userDecisionsRef.off();
  },

  render: function() {
    var decisions = this.state.decisions.map(function(decision) {
      return <li>{decision.name}</li>
    });

    if (this.state.viewFriends) {
      return (<FriendView username={this.props.username} addFriend={this._addFriend}/>)
    }

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
  },


})

module.exports = MainView;