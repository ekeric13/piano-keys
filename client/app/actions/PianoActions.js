var Reflux = require("reflux");

var PianoActions = Reflux.createActions([
  'getAllPianos',
  'addToQueue',
  'noteDequeue'
]);

module.exports = PianoActions;
