var AppDispatcher = require('../modules/dispatcher');
var Action = require("./Action");
var tv4 = require("tv4");

var namespace = function(genus, species) {
  return [genus, species].join("_");
};

module.exports = function(category, actions) {
  var actionCreator = {};

  var actionNames = Object.keys(actions);

  actionNames.forEach(function(actionName) {
    var schema = actions[actionName];

    actionCreator[actionName] = function(data) {
      if (schema) {
        var validation = tv4.validateResult(data, schema);
        if (!validation.valid) {
          var error = validation.error;
          var errorString = ["Validation error for", category, "action", "`"+actionName+"`:",
            "[", error.message, "at path", error.dataPath, "]"].join(" ");
          console.error(errorString);
          return new Error(errorString);
        }
      }

      AppDispatcher.dispatch(Action(namespace(category, actionName), data));
    };
  });

  actionCreator.type = function(type) {
    if (typeof actions[type] === "undefined") {
      throw new Error(["`", category, "` has no action `", type, "`"].join(""));
    }
    return namespace(category, type)
  };

  return actionCreator;
};