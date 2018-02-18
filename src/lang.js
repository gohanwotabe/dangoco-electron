/*
Copyright 2018 gohanwotabe

dangoco client language
*/

"use strict";

let i18n=require('i18n'),
		Path=require('path'),
		{app} = require('electron');

global.i18n=i18n;

/*--------i18n---------*/
i18n.configure({
	locales:['en','zh'],
	syncFiles: true,
	directory: Path.resolve(__dirname,'ui/lang'),
	register: global,
	autoReload: true,
	logDebugFn: function (msg) {
		console.log('[i18n]debug', msg);
	},
	// setting of log level WARN - default to require('debug')('i18n:warn') 
	logWarnFn: function (msg) {
		console.log('[i18n]warn', Error(msg));
	},
	// setting of log level ERROR - default to require('debug')('i18n:error') 
	logErrorFn: function (msg) {
		console.log('[i18n]error', Error(msg));
	},
});

i18n.setLanguage=(code)=>{
	if(code=='auto')code=locale;
	i18n.setLocale(code);
}

let locale=app.getLocale(),
	avail=new Set(i18n.getLocales());
if(!avail.has(locale)){
	locale=locale.match(/^[^\-]+/)[0];
}

i18n.setLanguage(clientConfig.get('language',locale));