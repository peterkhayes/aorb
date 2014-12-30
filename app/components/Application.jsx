var React = require("react");
var AuthView = require("./AuthView");
var MainView = require("./MainView");
var DecideView = require("./DecideView");

var getInitialState = function() {

};

var App = React.createClass({
  getInitialState: function() {
    return {
      username: null,
      currentDecision: null
    }
  },

  render: function() {
    var username = this.state.username;
    var currentDecision = this.state.currentDecision;
    if (!username) {
      return <AuthView />
    } else if (currentDecision) {
      return <DecideView username={username} decision={currentDecision}/>
    } else {
      return <MainView username={username}/>
    }
  }
});

module.exports = App;