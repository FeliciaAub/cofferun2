(function(window) {
  'use strict';
  var App = window.App || {};

  var deployd = require('deployd');

  var dpd = deployd({
    port: process.env.PORT || 5000,
    env: 'development',
    db: {
      host: 'localhost',      // Our mongo instance runs in our server itself. Remember? (127.0.0.1)
      port: 27017,            // Update this line,
      name: 'deployd'
    }
  });

  server.listen();

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
      return;
    }
    this.serverUrl = url;
  }
  RemoteDataStore.prototype.add = dpd.coffeerun.post(function(key, val) {
    return $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
    });
  });
  RemoteDataStore.prototype.getAll = function(cb) {
    return $.get(this.serverUrl, function(serverResponse) {
      if (cb) {
      console.log(serverResponse);
      cb(serverResponse);
      }
    });
  };
  RemoteDataStore.prototype.get = dpd.coffeerun.get(function(key) {
    return $.get(this.serverUrl + '/' + key, function(serverResponse) {
      if (cb) {
      console.log(serverResponse);
      cb(serverResponse);
      }
    });
  });
  RemoteDataStore.prototype.remove = dpd.coffeerun.del(function(key) {
    return $.ajax(this.serverUrl + key, {
      type: 'DELETE'
    });
  });

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
