var Action = function(type, data) {
  var action = {
    type: type,
    data: data
  };

  action.has = function(key) {
    return (typeof action.data[key] !== "undefined")
  };

  action.get = function(key) {
    var value = action.data[key];
    if (typeof value === "undefined") {
      throw new Error("Action does not have data with key `" + key + "`");
    }
    return value;
  };

  return action;
};

module.exports = Action;