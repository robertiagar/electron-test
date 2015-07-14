var app = require('app');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var fs = require('fs');
var path = require('path');
var ipc = require('ipc');
var id3js = require('id3js');

var walk = function (dir, done) {
	var results = [];
	fs.readdir(dir, function (err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function (file) {
			file = path.resolve(dir, file);
			fs.stat(file, function (err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function (err, res) {
						results = results.concat(res);
						if (!--pending) done(null, results);
					});
				} else {
					results.push(file);
					if (!--pending) done(null, results);
				}
			});
		});
	});
};

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({ width: 800, height: 600 });

	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	ipc.on('path', function (event, myPath) {
		walk(myPath, function (err, results) {
			if (err) throw err;
			for (var index = 0; index < results.length; index++) {
				var element = results[index];
				mainWindow.send('file', element);
			}
		});
	});
	
	ipc.on('time',function(event, time){
		//console.log(time);
		var progress = ((time.currentTime * 100)/time.duration)/100.0;
		//console.log(progress);
		mainWindow.setProgressBar(progress);
		mainWindow.send('progress',progress);
	})
});