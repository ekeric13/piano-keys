var React = require("react");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;


var NoteForm = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    _id: React.PropTypes.number,
    octave: React.PropTypes.string
  },

  playNotes: function(e) {
    e.preventDefault();
    var currentTargetClassName = e.currentTarget.className;
    var notes = $("." + currentTargetClassName + " textarea").val().toLowerCase().replace(/\s+/g,"").split(",");
    for (var i = 0; i < notes.length; i++) {
      this.playTimeoutNote(notes, i);
    }
  },

  playTimeoutNote: function(notes, i) {
    var currentNote = notes[i];
    var selectedNote = $("li[data-note='"+currentNote+"']");
    window.setTimeout(function() {
        if (currentNote.substring(1) === "s"){
          selectedNote.addClass("temp-active-sharp");
        } else {
          selectedNote.addClass("temp-active");
        }
        selectedNote.trigger("click");
    }, 1000* (i));
    window.setTimeout(function() {
        if (currentNote.substring(1) === "s"){
          selectedNote.removeClass("temp-active-sharp");
        } else {
          selectedNote.removeClass("temp-active");
        }
    }, (1000* (i))+100);
  },

  componentDidMount: function() {
    $(".notes-form").on("submit", this.playNotes);
  },

  render: function(){
    return (
      <div className="notes-area">
        <form className="notes-form">
          <div>
            <legend>Place notes here separated by commas.</legend>
            <legend>If want to play a sharp put a 's' after the note.</legend>
            <legend>Example:</legend>
            <code className="note-example">a,b,cs</code>
          </div>
          <textarea name="notes"></textarea>
          <input className="blue darken-3 waves-effect waves-light btn" type="submit" name="submit" value="Play"/>
        </form>
      </div>
    );
  }

});

module.exports = NoteForm;
