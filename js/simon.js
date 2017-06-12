var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;

// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
	// Create references to box element and audio element.
	var boxEl = document.getElementById(key);
	var audioEl = document.getElementById(key + '-audio');
	if (!boxEl) throw new Error('No NoteBox element with id' + key);
	if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

	// When enabled, will call this.play() and this.onClick() when clicked.
	// Otherwise, clicking has no effect.
	var enabled = true;
	// Counter of how many play calls have been made without completing.
	// Ensures that consequent plays won't prematurely remove the active class.
	var playing = 0;

	this.key = key;
	this.onClick = onClick || function () {};

	// Plays the audio associated with this NoteBox
	this.play = function () {
	playing++;
	// Easy Task is adding the setTimeout function. playing++ must be outside setTimeout for mouseover animation to work.
//setTimeout(function() {
		// Always play from the beginning of the file.
		audioEl.currentTime = 0;
		audioEl.play();
	//}, 2500);

		// Set active class for NOTE_DURATION time
		boxEl.classList.add('active');
		setTimeout(function () {
			playing--;
			if (!playing) {
				boxEl.classList.remove('active');
			}
		}, NOTE_DURATION);
	};

	// Enable this NoteBox
	this.enable = function () {
		enabled = true;
	};

	// Disable this NoteBox
	this.disable = function () {
		enabled = false;
	};

	// Call this NoteBox's clickHandler and play the note.
	this.clickHandler = function () {
		if (!enabled) return;

		this.onClick(this.key);
		this.play();
	}.bind(this);

	this.getBox = function() {
		return boxEl;
	};

	boxEl.addEventListener('mousedown', this.clickHandler);


}

// Example usage of NoteBox.
//
// This will create a map from key strings (i.e. 'c') to NoteBox objects so that
// clicking the corresponding boxes on the page will play the NoteBox's audio.
// It will also demonstrate programmatically playing notes by calling play directly.


// Challenge Task
function SimonSays() {
	// Initialize variables/arrays
	var notes = {};
	var computerNotes = [];
	var playerNotes = [];

	// Add event listeners to each note after generating a new NodeBox for each note.
	KEYS.forEach(function (key) {
		notes[key] = new NoteBox(key);
		notes[key].getBox().addEventListener('mousedown', function(event) {
			addClickEvents(event);
		});
	});
	// Function to add functionality to click event of each note.
	this.addClickEvents = function(e) {
		playerNotes.push(event.currentTarget.id);

		var correctNote = true;
		for (var i = 0; i < playerNotes.length; i++) {
		 	if (computerNotes[i] != playerNotes[i]) { correctNote = false; }
		}
				if(correctNote) {
					if (playerNotes.length == computerNotes.length) {
						setTimeout(startGame, NOTE_DURATION);
						playerNotes = [];
					}
				} else {
					alert("Wrong Note! Press OK to restart.");
					computerNotes = [];
					playerNotes = [];	
					setTimeout(startGame, NOTE_DURATION * 2);
				}
	}.bind(this);

	// Start the game 
	this.startGame = function() {
		// Use this to generate the next note that the computer plays
		var note = Math.floor(Math.random() * Object.keys(notes).length);
		var nextNoteplayed = KEYS[note];
		computerNotes.push(nextNoteplayed);

		computerNotes.forEach(function(key, i) {
			setTimeout(notes[key].play.bind(key), i * NOTE_DURATION);
		});
	};
	// Call the start game function, which calls the other helper functions.
	startGame();
}
// Call the function to start the game.
alert("Press OK to start the game.");
SimonSays();
