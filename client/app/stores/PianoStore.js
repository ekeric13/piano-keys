var Reflux = require("reflux");
var PianoActions = require("../actions/PianoActions");

var PianoStore = Reflux.createStore({

  listenables: PianoActions,

  _pianos: [],

  getAll: function() {
    return this._pianos;
  },

  getAllPianos: function() {
    // var pianos = [{"id": 1, "octave": "1"}, {"id":2, "octave":"2"}];
    var pianos = [{"id": 1, "octave": "1"}];
    this._pianos = pianos;
    console.log("in piano store",this._pianos);
    this.trigger();
    // NORMALLY WOULD HAVE AJAX
    // $.ajax({
    //   type: 'GET',
    //   url: 'url'
    // })
    // .done(function (pianos) {
    //   // broadcast that _pianos has changed
    //   this.trigger();
    // }.bind(this))
    // .fail(function(error) {
    //   console.error(error);
    // });
  }

});

module.exports = PianoStore;
