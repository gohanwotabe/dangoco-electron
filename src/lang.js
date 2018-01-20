/*
Copyright 2018 gohanwotabe

dangoco client language
*/
let i18n=require('i18n'),
		Path=require('path'),
		{app} = require('electron');

/*--------i18n---------*/
i18n.configure({
    locales:['en'],
    directory: Path.resolve(__dirname,'ui/lang'),
    defaultLocale:'en',
    register: global,
    logDebugFn: function (msg) {
        console.log('[i18n]debug', msg);
    },
    // setting of log level WARN - default to require('debug')('i18n:warn') 
    logWarnFn: function (msg) {
        console.log('[i18n]warn', msg);
    },
    // setting of log level ERROR - default to require('debug')('i18n:error') 
    logErrorFn: function (msg) {
        console.log('[i18n]error', msg);
    },
});
i18n.setLocale(app.getLocale());
