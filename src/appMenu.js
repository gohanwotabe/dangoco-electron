/*
Copyright 2018 gohanwotabe

dangoco client settings window
*/

"use strict";
const {Menu} = require('electron');

if (process.platform === 'darwin') {
	const menu = Menu.buildFromTemplate([]);
	Menu.setApplicationMenu(menu);
}

