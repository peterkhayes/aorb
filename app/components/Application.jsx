var React = require("react");
var MainView = require("./MainView.jsx");
var LoginView = require("./LoginView.jsx");


var App = React.createClass({

  getInitialState: function() {
    return {
      username: ""
    };
  },

  render: function() {
    var username = this.state.username;
    if (!username) {
      return <LoginView submit={this._login}/>
    } else {
      return <MainView username={username}/>
    }
  },

  _login: function(username) {
    this.setState({username: username})
  }
});

module.exports = App;