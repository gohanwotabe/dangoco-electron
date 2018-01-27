var webFrame = require('electron').webFrame;
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

const $=document.querySelector.bind(document),
	$$=document.querySelectorAll.bind(document);

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
		if(t.className='side_button'){
			if(t.classList.contains('active'))return;
			displayingPage&&$(`#side #${displayingPage}`).classList.remove('active');
			displayingPage&&$(`#main #${displayingPage}`).classList.remove('active');
			$(`#main #${t.id}`).classList.add('active');
			t.classList.add('active');
			displayingPage=t.id;
		}
	});
	$(`#side #server`).click();
})