var React = require("react");
var Reflux = require("reflux");
var Piano = require("./Piano");
var PianoStore = require("../../../stores/PianoStore");
var PianoActions = require("../../../actions/PianoActions");


var Pianos = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      pianos: PianoStore.getAll()
    };
  },

  componentDidMount: function () {
    if (this.state.pianos.length === 0) {
      PianoActions.getAllPianos();
      $(".header").before("<div class='loading'></div>");
    }
    this.listenTo(PianoStore, this.onStoreChange);
  },

  onStoreChange: function(){
    if(this.isMounted()) {
      this.setState({ pianos: PianoStore.getAll() });
    }
  },

  componentDidUpdate: function() {
    if ($(".loading")) {
      $(".loading").remove();
    }
  },

  render: function() {
    var pianos = [];
    var self = this;
    // create all idea components
    this.state.pianos.forEach(function(piano, index) {
      pianos.push(<Piano key={index} _id={piano.id} octave={piano.octave} />);
    });
    return (
    <div>
      <div className="pianos-container">
        { pianos }
      </div>
    </div>
    );
  }

});

module.exports = Pianos;
