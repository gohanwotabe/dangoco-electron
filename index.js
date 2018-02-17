/*
Copyright 2017 gohanwotabe
*/
'use strict';

if(!console.debug)console.debug=console.log;
const {app} = require('electron')

global.app=app;
app.setName('dangoco');
app.dock&&app.dock.hide();

//only allow one instance
if(  app.makeSingleInstance( (commandLine,workingDirectory)=>app.emit('active') )  ){
	app.quit();
	return;
}



require('./src/main.js');//load main js
