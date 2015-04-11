var React = require("react");
var Pianos = require("./PianoViewComponents/Pianos");

var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var PianoView = React.createClass({

  mixins: [PureRenderMixin],



  render: function() {
    return (
      <div className="piano-container">
        <h2 className="header"> Play some <b>notes</b> </h2>

      </div>
    )
  }
});

module.exports = PianoView;
