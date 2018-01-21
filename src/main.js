/*
Copyright 2018 gohanwotabe

dangoco client daemon main thread
*/
'use strict';

/*debug*/
process.on('uncaughtException',function(e){//prevent server from stoping when uncaughtException occurs
    console.error(e);
    process.exit(1)
});


const {app}=require('electron');
app.setName('dangoco');

// app.dock.setIcon(__dirname+'/ui/res/pic/icon.png');


require('./lang.js');
require('./tray.js');
require('./appMenu.js');
require('./settings.js');
