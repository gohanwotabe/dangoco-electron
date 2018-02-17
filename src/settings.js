/*
Copyright 2018 gohanwotabe

dangoco client settings window
*/

const {app, Menu, BrowserWindow} = require('electron');

global.settingsWindow=null;


app.on('active',(page='server')=>{
	if(global.settingsWindow){//show the window if it has been created
		settingsWindow.webContents.send('active_page',page)
		settingsWindow.show();
		return;
	}
	settingsWindow = new BrowserWindow({
		width: 535, 
		height: 548,
		show: false,
		// resizable:false,
		maximizable:false,
		// minimizable:false,
		title:`${__('dangoco')}`,
		disableAutoHideCursor:true,
		icon:__dirname+'/ui/res/pic/icon.png',
	});
	settingsWindow.setMenu(null);
	settingsWindow.loadURL(`file://${__dirname}/ui/page/index.html#${page}`);
	settingsWindow.webContents.setVisualZoomLevelLimits(1,1);
	settingsWindow.webContents.setLayoutZoomLevelLimits(1,1);
	settingsWindow.once('closed',e=>{
		global.settingsWindow=null;
		app.dock&&app.dock.hide();
	}).once('ready-to-show', () => {
		//for macos
		app.dock&&app.dock.show();
		app.dock&&app.dock.setIcon(__dirname+'/ui/res/pic/dangoco.png');


		settingsWindow.show();
	});

	settingsWindow.webContents.openDevTools({mode:'detach'});

}).on('window-all-closed', () => {
	//not quit
}).on('activate', () => {
	app.emit('active');
});

if(!clientConfig.server || clientConfig.server.length===0){
	app.emit('active');//active the settings window if there is no server set
}