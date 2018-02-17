/*
Copyright 2018 gohanwotabe

dangoco client server manager
*/
'use strict';

let runtimeServerList=new Map();

function genID(){
	let id;
	while(runtimeServerList.has(id=((0xFFFFFF*Math.random())|0).toString(32))){}
	return id;
}

global.serverManager={
	new(){
		this.add({name:__('new server')});
	},
	load(){
		let serverList=clientConfig.get('servers',[]);
		for(let s of serverList){
			serverManager.add(s);
		}
	},
	save(){
		let sList=[];
		runtimeServerList.forEach((server,id)=>{
			let sobj=Object.assign({},server);
			delete sobj.serverID;
			sList.push(sobj);
		});
		clientConfig.set('servers',sList);
	},
	get(serverID){
		return runtimeServerList.get(serverID);
	},
	add(server){
		let sobj=Object.assign({},server);
		sobj.serverID=genID();
		runtimeServerList.set(sobj.serverID,sobj);
		//todo add to childClient
	},
	delete(serverID){
		let sobj=runtimeServerList.get(serverID);
		if(!sobj)return false;
		runtimeServerList.delete(serverID);
		/*for(let i=runtimeServerList.length;i--;){
			if(runtimeServerList[i].serverID===serverID){
				runtimeServerList.splice(i,1);
				break;
			}
		}*/
		//todo remove from childClient
	},
	mod(serverID,server){
		let rawobj=runtimeServerList.get(serverID);
		if(!rawobj)return false;
		let sobj=Object.assign({},server);
		runtimeServerList.set(serverID,sobj);
		/*for(let i=runtimeServerList.length;i--;){
			if(runtimeServerList[i].serverID===serverID){
				runtimeServerList[i]=sobj;
				break;
			}
		}*/
		//todo mod server info in the childClient
	},
	list(){
		if(runtimeServerList.size===0){
			this.new();
		}
		return [...runtimeServerList.values()];
	},
}

serverManager.load();