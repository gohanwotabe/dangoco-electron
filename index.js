/*
Copyright 2017 gohanwotabe
*/
'use strict';


const {app} = require('electron')

app.dock.hide();

//only allow one instance
const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
	app.emit('active');
});

if (isSecondInstance) {
  app.quit();
  return;
}

//change userdata path to working directory on platforms except macos
if(process.platform!=='drawin')
	app.setPath('appData', __dirname+'/data');

require('./src/main.js');//load main js
