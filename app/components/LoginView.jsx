var React = require("react");
var Firebase = require("../factories/Firebase");

var LoginView = React.createClass({
  render: function() {
    return (
      <div>
        <h1>A or B</h1>
        <p>What's your name?</p>
        <input type='text' ref='input'></input>
        <button onClick={this._onClick}>Go</button>
      </div>
    );
  },

  _onClick: function() {
    var username = this.refs.input.getDOMNode().value;
    if (username.length > 0) {
      this.props.submit(username);
    }
  }
})

module.exports = LoginView;