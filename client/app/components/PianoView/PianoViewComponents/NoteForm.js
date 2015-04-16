var React = require("react");
var Reflux = require("reflux");
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var PianoStore = require("../../../stores/PianoStore");
var PianoActions = require("../../../actions/PianoActions");

var NoteForm = React.createClass({

  mixins: [PureRenderMixin, Reflux.ListenerMixin],

  propTypes: {
    _id: React.PropTypes.number,
    octave: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      noteQueue: []
    }
  },

  onStoreChange: function(){
    if(this.isMounted()) {
      this.setState({ noteQueue: PianoStore.getNoteQueue() });
    }
  },

  playNotes: function(e) {
    e.preventDefault();
    var currentTargetClassName = e.currentTarget.className;
    var notes = $("." + currentTargetClassName + " textarea").val().toLowerCase().replace(/\s+/g,"").split(",");
    PianoActions.addToQueue(notes);
  },

  iterateThroughNoteQueue: function() {
    var self = this;
    var noteQueue = this.state.noteQueue;
    if (noteQueue.length > 0) {
      this.playTimeoutNote(noteQueue[0]);
    } else {
      window.setTimeout(function() {
        self.iterateThroughNoteQueue();
      }, 800);
    }
  },

  playTimeoutNote: function(note) {
    var self = this;
    var currentNote = note;
    var selectedNote = $("li[data-note='"+currentNote+"']");
    window.setTimeout(function() {
        if (currentNote.substring(1) === "s"){
          selectedNote.addClass("temp-active-sharp");
        } else {
          selectedNote.addClass("temp-active");
        }
        selectedNote.trigger("click");
        PianoActions.noteDequeue(function(){
          self.iterateThroughNoteQueue();
        });
    }, 800);
    window.setTimeout(function() {
        if (currentNote.substring(1) === "s"){
          selectedNote.removeClass("temp-active-sharp");
        } else {
          selectedNote.removeClass("temp-active");
        }
    }, 800 + 100);
  },

  componentDidMount: function() {
    $(".notes-form").on("submit", this.playNotes);
    this.listenTo(PianoStore, this.onStoreChange);
    this.iterateThroughNoteQueue();
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
          <input className="blue darken-3 waves-effect waves-light btn note-button" type="submit" name="submit" value="Play"/>
        </form>
      </div>
    );
  }

});

module.exports = NoteForm;
