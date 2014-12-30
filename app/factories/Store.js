var EventEmitter = require('events').EventEmitter;
var Dispatcher = require("../modules/dispatcher");
var mergeInto = require("react/lib/mergeInto")

var StoreFactory = function(props) {
  var store = new EventEmitter();
  store.setMaxListeners(100);

  props = props || {};

  mergeInto(store, {

    addChangeListener: function(callback) {
      store.on("change", callback);
    },

    removeChangeListener: function(callback) {
      store.removeListener("change", callback);
    },

    emitChange: function() {
      store.emit("change");
    },

    register: function(handler) {
      Dispatcher.register(function(action) {
        handler(action);
        store.emitChange();
        return true;
      });
    }

  });

  mergeInto(store, props);
  return store;
};


module.exports = StoreFactory;