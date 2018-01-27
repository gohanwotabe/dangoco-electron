/*
Copyright 2018 gohanwotabe

dangoco client daemon main thread
*/
'use strict';

/*debug*/
process.on('uncaughtException',function(e){//prevent server from stoping when uncaughtException occurs
    console.error(e);
});


require('./lang.js');//language
require('./tray.js');//tray icon
require('./appMenu.js');//app menu (for macos)
require('./settings.js');//settings window

app.once('ready',()=>{
	app.setName(__('dangoco'));
})