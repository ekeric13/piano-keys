var React = require("react");
var cx = React.addons.classSet;

var Piano = React.createClass({

  displayName: 'Piano',

  propTypes: {
    _id: React.PropTypes.number,
    octave: React.PropTypes.string
  },

  grabPiano: function(){
    $(".scale").children().each(function(index, el){
      var innerHtml = $(el).text().split(" ");
      if (innerHtml[1] === undefined) {
      $(el).append("<span class='scale-key'>"+innerHtml[0]+"</span>");
      } else {
        $(el).append("<span class='scale-key key-sharp'>"+innerHtml[0]+"</span>");
      }
    });
  },

  componentDidMount: function() {
    console.log("props",this.props, this.props._id, this.props.octave);
    this.grabPiano();
  },


  render: function(){
    return (
    <div className="piano-layer">
      <ol className="scale">
        <li data-note="c" >C</li>
        <li data-note="cs" className="ebony">C# D&#9837;</li>
        <li data-note="d">D</li>
        <li data-note="ds" className="ebony">D# E&#9837;</li>
        <li data-note="e">E</li>
        <li data-note="f">F</li>
        <li data-note="fs" className="ebony">F# G&#9837;</li>
        <li data-note="g">G</li>
        <li data-note="gs" className="ebony">G# A&#9837;</li>
        <li data-note="a">A</li>
        <li data-note="as" className="ebony">A# B&#9837;</li>
        <li data-note="b">B</li>
      </ol>

    </div>
    );
  }

});

module.exports = Piano;
