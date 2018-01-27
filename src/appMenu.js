/*
Copyright 2018 gohanwotabe

dangoco client settings window
*/

"use strict";
const {Menu} = require('electron');

if (process.platform === 'darwin') {
	app.once('ready',()=>{
		const menu = Menu.buildFromTemplate([
			{
				label: app.getName(),
				submenu:[
					{role: 'quit',label:__('Quit')}
				]
			},
			{
				label: __('Edit'),
				submenu: [
					{role: 'undo',label:__('Undo')},
					{role: 'redo',label:__('Redo')},
					{type: 'separator'},
					{role: 'cut',label:__('Cut')},
					{role: 'copy',label:__('Copy')},
					{role: 'paste',label:__('Paste')},
					{role: 'selectall',label:__('Select All')}
				]
			},
		]);
		Menu.setApplicationMenu(menu);
	});
	
}

