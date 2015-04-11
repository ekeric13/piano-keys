var React = require("react");

var noteCounter = {
  c : 0,
  cs: 0,
  d : 0,
  ds: 0,
  e : 0,
  f : 0,
  fs: 0,
  g : 0,
  gs: 0,
  a : 0,
  as: 0,
  b : 0
};

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

  noteClick: function(el) {
    var note = el.dataset.note;
    noteCounter[note]++
    var currentNoteCount = noteCounter[note];
    $(".mid-"+note+"-played").remove();
    var htmlNote = note.replace("s", "#");
    $(el).append("<div class='played mid-"+note+"-played'>"+htmlNote+" "+currentNoteCount+"</div>");
    if (note.substring(1) === "s") {
      $(".mid-"+note+"-played").addClass("sharp");
    }
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
    this.grabPiano();
    var self = this;
    $(".scale li").on("click", function(){
      var note = this.dataset.note;
      self.noteClick(this);
    });
    $(".notes-form").on("submit", this.playNotes);
  },


  render: function(){
    return (
    <div className="piano-layer">
      <ol className="scale">
        <li data-note="c" >C</li>
        <li data-note="cs" className="black-keys">C# D&#9837;</li>
        <li data-note="d">D</li>
        <li data-note="ds" className="black-keys">D# E&#9837;</li>
        <li data-note="e">E</li>
        <li data-note="f">F</li>
        <li data-note="fs" className="black-keys">F# G&#9837;</li>
        <li data-note="g">G</li>
        <li data-note="gs" className="black-keys">G# A&#9837;</li>
        <li data-note="a">A</li>
        <li data-note="as" className="black-keys">A# B&#9837;</li>
        <li data-note="b">B</li>
      </ol>
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
    </div>
    );
  }

});

module.exports = Piano;
