/*
Copyright 2018 gohanwotabe

dangoco client settings window
*/

const {app, Menu, BrowserWindow} = require('electron');

global.settingsWindow=null;


app.on('active',()=>{
	if(global.settingsWindow){//show the window if it has been created
		settingsWindow.show();
		return;
	}
	settingsWindow = new BrowserWindow({
		width: 800, 
		height: 600,
		show: false,
		resizable:false,
		maximizable:false,
		// minimizable:false,
		title:`${__('Settings')} - ${__('dangoco')}`,
		disableAutoHideCursor:true,
		icon:__dirname+'/ui/res/pic/icon.png',
	});
	settingsWindow.loadURL(`file://${__dirname}/ui/page/index.html`);
	settingsWindow.once('closed',e=>{
		global.settingsWindow=null;
		app.dock.hide();
	}).once('ready-to-show', () => {
		//for macos
		app.dock.show();
		app.dock.setIcon(__dirname+'/ui/res/pic/icon.png');

		
		settingsWindow.show();
	});

	settingsWindow.webContents.openDevTools({mode:'detach'});

}).on('window-all-closed', () => {
	//not quit
}).on('activate', () => {
	app.emit('active');
})
