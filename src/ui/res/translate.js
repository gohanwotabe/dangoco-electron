/*
Copyright 2018 gohanwotabe

dangoco client page loader
*/

'use strict';
const translateField=/^\{\{(.+?)\}\}$/;
const remote=require('electron').remote;

const __=remote.getGlobal('__');

window.addEventListener('load',()=>{
	document.querySelectorAll('[trans]').forEach(e=>{
		let trans=e.getAttribute('trans');
		let a=(trans?e.getAttribute(trans):e.innerHTML).match(translateField);
		if(a){
			if(trans){
				e.setAttribute(trans,__(a[1]));
			}else{
				e.innerHTML=__(a[1]);
			}
		}
		console.debug('trans:',a[1],e.innerHTML);
	});
});