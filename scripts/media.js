var ipc = require("ipc");
var id3js = require("id3js");

ipc.on("file", function (value) {
	var track = {};
	var $musicList = $('#music');

	var click = function () {
		var attribute = this.getAttribute('data-path');
		console.log(attribute);

		var audio = document.getElementById("audio");
		var source = '<source src="' + attribute + '">';

		id3js({ file: value, type: id3js.OPEN_LOCAL }, function (err, tags) {
			$("#nowplaying").text(tags.artist + " - " + tags.title);
		});

		audio.innerHTML = source;
		audio.load();
		audio.play();

		var $audio = $("#audio");
		$audio.on("timeupdate", function () {
			var time = { currentTime: this.currentTime, duration: this.duration };
			ipc.send('time', time);
		});
	}
	
	id3js({ file: value, type: id3js.OPEN_LOCAL }, function (err, tags) {

		var $li = $("<li>", { "data-path": value }).text(tags.artist + " - " + tags.title);

		$li.click(click);
		$musicList.append($li);
	});
});

ipc.on('progress', function (progress) {
	console.log(progress);
	var $bar = $("#progressBar");
	$bar.attr("aria-valuenow", progress * 100);
	$bar.attr("style", "width: " + progress * 100 + "%");
});