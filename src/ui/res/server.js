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



//fill algorithms
let algos=require('crypto').getCiphers();
algos.unshift('none');
for(let a of algos){
	let opt=document.createElement('option');
	opt.value=opt.innerHTML=a;
	settingEles.algorithm.appendChild(opt);
}


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
		}
		ele_server_list.appendChild(opt);
	}
}




/*load info*/
/*
settingEles[name]	 => 	info[name]
	serverName 					=> name
	serverAddress 				=> address
	user						=> user
	password					=> password
	algorithms					=> algo
	keyLength					=> keyLength
	disableDeflate				=> disableDeflate
	idleTimeout					=> idle
	keepBrokenTunnelTimeout		=> keepBrokenTunnel
	connectionPerRequest		=> connectionPerRequest
	connectionPerTarget			=> connectionPerTarget
	connectionPerTCP			=> connectionPerTCP
	connectionPerUDP			=> connectionPerUDP
	connectionForUDP			=> connectionForUDP

*/
function loadInfo(serverID){
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

