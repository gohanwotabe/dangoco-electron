/*
Copyright 2017 gohanwotabe
*/
'use strict';


const {app} = require('electron')

app.setName('dangoco');
app.dock&&app.dock.hide();

//only allow one instance
if(  app.makeSingleInstance( (commandLine,workingDirectory)=>app.emit('active') )  ){
	app.quit();
	return;
}


const configStore=require('electron-store');
//load config
const configOpt={};
if(process.platform!=='drawin')//change userdata path to working directory on platforms except macos
	configOpt.cwd=__dirname+'/data';
global.clientConfig=new configStore(configOpt);
console.debug("config",clientConfig.path,clientConfig.store)

require('./src/main.js');//load main js
