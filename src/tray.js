/*
Copyright 2018 gohanwotabe

dangoco client tray
*/
'use strict';

const {app, Menu, Tray} = require('electron');

global.trayIcon=null;

app.on('ready', () => {
	trayIcon = new Tray(__dirname+'/ui/res/pic/icon.png');
	// trayIcon.setToolTip('dangoco')
	const trayMenu = Menu.buildFromTemplate([
		{label: __('Open Settings'), type: 'normal',id:'openSettings',click:()=>{
			app.emit('active');
		}},
		{type: 'separator'},
		{label: __('Quit'), type: 'normal',id:'quit',click:()=>{
			app.quit();
		}}
	]);

	trayIcon.on('right-click',()=>{trayIcon.popUpContextMenu()});//enable right click on tary icon

	trayIcon.setContextMenu(trayMenu);
});