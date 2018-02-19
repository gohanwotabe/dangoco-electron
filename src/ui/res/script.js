const electron=require('electron'),
	shell = electron.shell;

window.remote=electron.remote;
window.remoteProcess=remote.process;
window.clientConfig=remote.getGlobal('clientConfig');
window.settingWindow=remote.getCurrentWindow();


//prevent zoom
var {webFrame} = electron;
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);


window.$=document.querySelector.bind(document);
window.$$=document.querySelectorAll.bind(document);

//import sub pages
$$('div.sub_page').forEach(e=>{
	var link = document.createElement('link');
	link.rel = 'import';
	link.href = e.getAttribute('page');
	document.head.appendChild(link);
	link.onload=()=>{
		e.append(...link.import.body.childNodes);
	}
});



window.addEventListener('load',()=>{
	//bind pages
	let displayingPage=null;
	$('#side').addEventListener('click',e=>{
		let t=e.target;
		if(t.className=='side_button'){
			if(t.classList.contains('active'))return;
			displayingPage&&$(`#side #${displayingPage}`).classList.remove('active');
			displayingPage&&$(`#main #${displayingPage}`).classList.remove('active');
			let subPage=$(`#main #${t.id}`);
			subPage.classList.add('active');
			t.classList.add('active');
			displayingPage=t.id;
			location.hash='#'+t.id;
			remote.getCurrentWindow().setTitle(`${t.title} - ${__('dangoco')}`);
			let subWidth=1*subPage.getAttribute('width');
			settingWindow.setContentSize(subWidth+34,subPage.offsetHeight,false);
		}
	});
	$(`#side ${location.hash}`).click();


	require('../res/lib.js');
	//load each pages' js
	require('../res/server.js');
	require('../res/socks.js');
	require('../res/info.js');
	
	//open links in borwser
	$$('a[href]').forEach(a=>{
		const url = a.getAttribute('href')
		if (url.indexOf('http') === 0) {
			a.addEventListener('click', function (e) {
				e.preventDefault()
				shell.openExternal(url)
			})
		}
	});
})

electron.ipcRenderer.on('active_page', (event, page) => {
	$(`#side #${page}`).click();
})