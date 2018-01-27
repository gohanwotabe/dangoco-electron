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
		{label: __('Server Settings'), type: 'normal',id:'openSettings',click:()=>{
			app.emit('active');
		}},
		{type: 'separator'},
		{label: __('Connection'),submenu:[
			{
				label: __('Connection List'),
				click(){app.emit('active','connection')}
			},
			{
				label: __('Disconnect All'),
				click(){}
			}
		]},
		{type: 'separator'},
		{label: __('About'),role:'help',submenu:[
			{
				label: __('Info'),
				click(){app.emit('active','info')}
			},
			{
				label: __('GitHub'),
				click(){require('electron').shell.openExternal('https://github.com/dangoco/dangoco-electron')}
			}
		]},
		{type: 'separator'},
		{label: __('Quit'), type: 'normal',id:'quit',click:()=>{
			app.quit();
		}}
	]);

	trayIcon.on('right-click',()=>{trayIcon.popUpContextMenu()});//enable right click on tary icon

	trayIcon.setContextMenu(trayMenu);
});