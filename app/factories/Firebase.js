var Firebase = require("firebase");
var path = require('path');

module.exports = function() {
  path = Array.prototype.slice.call(arguments).map(function(item) {
    if (item[0] === "/") {
      item = item.slice(1);
    }
    if (item[item.length - 1] === "/") {
      item = item.slice(0, -1);
    }
    return item;
  }).join("/");
  path = "https://aorb.firebaseio.com/" + path;
  return new Firebase(path);
};