/*--------server setting part---------*/
let editingServer=null;

/*
server list is loaded from the global variable serverManager in the main process
*/
const serverManager=remote.getGlobal('serverManager');


/*elements*/
const ele_server_setting=$('#server_setting'),
	settingEles=ele_server_setting.elements,
	ele_server_list=$('#server_list'),
	eles_settingItem=$$('#server_setting *[setting-item]');



//fill algorithms
let algos=require('crypto').getCiphers();
algos.unshift('none');
for(let a of algos){
	let opt=document.createElement('option');
	opt.value=opt.innerHTML=a;
	settingEles.algorithm.appendChild(opt);
}


/*events*/
//new server
$('#new_server').addEventListener('click',()=>{
	serverManager.new();
	refreshServerList();
	selectIndex(ele_server_list.length-1);//select the new server
});
//delete server
$('#delete_server').addEventListener('click',()=>{
	let selectedIndex=ele_server_list.selectedIndex;
	serverManager.delete(ele_server_list[selectedIndex].serverID);
	refreshServerList();
	selectIndex((ele_server_list.length<=selectedIndex)?ele_server_list.length-1:selectedIndex);
});
//duplicate server
$('#duplicate_server').addEventListener('click',()=>{
	let selectedIndex=ele_server_list.selectedIndex;
	// serverManager.delete(ele_server_list[selectedIndex].serverID);
	let server=serverManager.get(ele_server_list[selectedIndex].serverID);
	serverManager.add(server);
	refreshServerList();
	selectIndex(ele_server_list.length-1);//select the new server
});
//info change
$('#server_info').addEventListener('change',recordChange);
//save server
$('#save_server').addEventListener('click',()=>{
	saveAll();
	refreshServerList();
});
//select server
ele_server_list.addEventListener('click',e=>{
	let t=e.target;
	if(t.serverID)
		loadInfo(t.serverID);
});
ele_server_list.addEventListener('change',e=>{
	ele_server_list[ele_server_list.selectedIndex].click();
});



//list
function selectIndex(ind){
	ele_server_list[ind].click();
	ele_server_list.selectedIndex=ind;
}
function getServerListOpt(serverID){
	for(let i=ele_server_list.length;i--;){
		if(ele_server_list[i].serverID===serverID){
			return ele_server_list[i];
		}
	}
}
function opt_drag(e){
	let opt=this,rect=opt.getBoundingClientRect();
	let ev=e.touches?e.touches[0]:e;
	if(ev.clientY<rect.top){
		if(opt.index>0){
			opt.previousElementSibling.insertAdjacentElement('beforebegin',opt);
		}
	}else if(ev.clientY>rect.top+rect.height){
		if(opt.index<ele_server_list.length-1){
			opt.nextElementSibling.insertAdjacentElement('afterend',opt);
		}
	}
}
function saveOrder(){
	let idList=[];
	ele_server_list.childNodes.forEach(o=>{
		idList.push(o.serverID);
	});
	serverManager.changeOrder(idList);
}
function refreshServerList(){
	let oldChildren=new Map();
	[...ele_server_list.children].forEach(opt=>{
		oldChildren.set(opt.serverID,opt);
	});
	ele_server_list.innerHTML='';
	let serverList=serverManager.list().map(s=>Object.assign({},s));
	//fill server list
	for(let s of serverList){
		let opt;
		if(opt=oldChildren.get(s.serverID)){}
		else{
			opt=document.createElement('option');
			opt.innerText=s.name;
			opt.serverID=s.serverID;
			extendEvent.touchdrag(opt);
			extendEvent.mousedrag(opt);
			opt.addEventListener('touchdragmove',opt_drag);
			opt.addEventListener('mousedragmove',opt_drag);
			opt.addEventListener('touchdragend',saveOrder);
			opt.addEventListener('mousedragend',saveOrder);
		}
		ele_server_list.appendChild(opt);
	}
}




/*load info*/
let justLoaded=null;
function loadInfo(serverID){
	if(justLoaded==serverID)return;
	justLoaded=serverID;
	let opt=getServerListOpt(serverID);
	let info=opt._edited||Object.assign({},serverManager.get(serverID));
	editingServer=info;
	eles_settingItem.forEach(ele=>{
		let settingItem=ele.getAttribute('setting-item');
		let value=(info[settingItem]===undefined)?ele.getAttribute('default'):info[settingItem];
		if(ele.localName==='input'){
			if(ele.type==='checkbox'){
				ele.checked=!!value;
			}else{
				ele.value=value;
			}
		}else if(ele.localName==='select'){
			ele.value=value;
		}
	});
}

//save info
function recordChange(){//just save in the tmp server list
	if(editingServer===null)return;
	let info=Object.assign({},editingServer);
	eles_settingItem.forEach(ele=>{
		let settingItem=ele.getAttribute('setting-item');
		if(ele.localName==='input'){
			if(ele.type==='checkbox'){
				info[settingItem]=ele.checked;
			}else if(ele.type==='number'){
				info[settingItem]=Number(ele.value);
			}else{
				info[settingItem]=ele.value;
				if(settingItem==='name')
					ele_server_list[ele_server_list.selectedIndex].innerText=ele.value+'*';

			}
		}else if(ele.localName==='select'){
			info[settingItem]=ele.value;
		}
	});
	console.debug('info changed',editingServer);
	let opt=getServerListOpt(info.serverID);
	opt._edited=info;
}
function saveAll(){
	let opt;
	for(let i=ele_server_list.length;opt=ele_server_list[--i];){
		if(!opt._edited){continue;}
		serverManager.mod(opt._edited.serverID,opt._edited);
		opt.innerText=opt._edited.name;
		opt._edited=null;
	}
	serverManager.save();
}


//start
refreshServerList();
selectIndex(0);//to default to select the first server

