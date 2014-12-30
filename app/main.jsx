/** @jsx React.DOM */

var React = require('react');
var App = require('./components/Application.jsx');
var FastClick = require("fastclick")

FastClick(document.body);

document.getElementById("before-react").style.display = "none";
React.initializeTouchEvents(true);
React.renderComponent(
  <App />,
  document.getElementById('react')
);
