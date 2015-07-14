
var remote = require('remote');
var Menu = remote.require('menu');
var dialog = remote.require('dialog');
var ipc = require('ipc');
var template = [
	{
        label: 'Electron',
        submenu: [
			{
				label: 'About Electron',
				selector: 'orderFrontStandardAboutPanel:'
			},
			{
				type: 'separator'
			},
			{
				label: 'Services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				label: 'Hide Electron',
				accelerator: 'Control+H',
				selector: 'hide:'
			},
			{
				label: 'Hide Others',
				accelerator: 'Control+Shift+H',
				selector: 'hideOtherApplications:'
			},
			{
				label: 'Show All',
				selector: 'unhideAllApplications:'
			},
			{
				type: 'separator'
			},
			{
				label: 'Quit',
				accelerator: 'Control+Q',
				selector: 'terminate:'
			},
			{
				type: 'separator'
			},
			{
				label: 'Open Folder',
				click: function () {
					var path = dialog.showOpenDialog({ properties: ['openDirectory'] });
					ipc.send('path', path[0]);
				}
			},
        ]
	},
	{
        label: 'Edit',
        submenu: [
			{
				label: 'Undo',
				accelerator: 'Control+Z',
				selector: 'undo:'
			},
			{
				label: 'Redo',
				accelerator: 'Shift+Control+Z',
				selector: 'redo:'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cut',
				accelerator: 'Control+X',
				selector: 'cut:'
			},
			{
				label: 'Copy',
				accelerator: 'Control+C',
				selector: 'copy:'
			},
			{
				label: 'Paste',
				accelerator: 'Control+V',
				selector: 'paste:'
			},
			{
				label: 'Select All',
				accelerator: 'Control+A',
				selector: 'selectAll:'
			}
        ]
	},
	{
        label: 'View',
        submenu: [
			{
				label: 'Reload',
				accelerator: 'Control+R',
				click: function () { remote.getCurrentWindow().reload(); }
			},
			{
				label: 'Toggle DevTools',
				accelerator: 'Alt+Control+I',
				click: function () { remote.getCurrentWindow().toggleDevTools(); }
			},
        ]
	},
	{
        label: 'Window',
        submenu: [
			{
				label: 'Minimize',
				accelerator: 'Control+M',
				selector: 'performMiniaturize:'
			},
			{
				label: 'Close',
				accelerator: 'Control+W',
				selector: 'performClose:'
			},
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				selector: 'arrangeInFront:'
			}
        ]
	},
	{
        label: 'Help',
        submenu: []
	}
];

menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);