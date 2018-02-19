/*
Copyright 2018 gohanwotabe

dangoco client page loader
*/

'use strict';
const translateField=/\{\{(.+?)\}\}/g;
const remote=require('electron').remote;

window.__=remote.getGlobal('__');
window.i18n=remote.getGlobal('i18n');

function translate(match,string){
	let _t=__(string);
	console.debug('trans:',string,_t);
	return _t;
}
function checkTranslate(e){
	let toTrans=e.getAttribute('trans').split(';')
	toTrans.forEach(trans=>{
		if(trans){
			e.setAttribute(trans,e.getAttribute(trans).replace(translateField,translate));
		}else{
			e.innerHTML=e.innerHTML.replace(translateField,translate);
		}
	});
}
window.addEventListener('load',()=>{
	document.querySelectorAll('[trans]').forEach(e=>{
		checkTranslate(e);
	});
});