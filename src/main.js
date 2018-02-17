/*
Copyright 2018 gohanwotabe

dangoco client daemon main thread
*/
'use strict';

/*debug*/
process.on('uncaughtException',function(e){//prevent server from stoping when uncaughtException occurs
    console.error(e);
});


app.once('ready',()=>{
	//base
	require('./clientConfig.js');
	require('./lang.js');//language
	app.setName(__('dangoco'));

	//proxy
	require('./serverManager.js');

	//ui
	require('./tray.js');//tray icon
	require('./appMenu.js');//app menu (for macos)
	require('./settings.js');//settings window
})