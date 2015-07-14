var ipc = require("ipc");
window.$ = window.jQuery = require('jquery');

ipc.on("file", function (value) {
	var musicList = document.getElementById('music');
	var track = "<li><a class='button' data-path='" + value + "'>" + value + "</a></li>";
	musicList.innerHTML += track;

	var buttons = document.getElementsByClassName("button");

	var click = function () {
		var attribute = this.getAttribute('data-path');
		console.log(attribute);

		var audio = document.getElementById("audio");
		var source = "<source src='" + attribute + "'>";
		
		audio.innerHTML = source;
		audio.load();
		audio.play();
	}

	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.addEventListener('click', click, false);
	}
});