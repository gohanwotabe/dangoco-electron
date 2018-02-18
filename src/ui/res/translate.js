/*
Copyright 2018 gohanwotabe

dangoco client page loader
*/

'use strict';
const translateField=/^\{\{(.+?)\}\}$/;
const remote=require('electron').remote;

window.__=remote.getGlobal('__');
window.i18n=remote.getGlobal('i18n');

window.addEventListener('load',()=>{
	document.querySelectorAll('[trans]').forEach(e=>{
		let trans=e.getAttribute('trans');
		let a=(trans?e.getAttribute(trans):e.innerHTML).match(translateField);
		if(a){
			let _t=__(a[1]);
			if(trans){
				e.setAttribute(trans,_t);
			}else{
				e.innerHTML=_t;
			}
			console.debug('trans:',a[1],_t);
		}
	});
});