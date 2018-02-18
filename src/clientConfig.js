/*
Copyright 2017 gohanwotabe
*/


/*
options
	language:(string),
	servers: (info of servers) [
		{
			name:(string),
			address:(string),
			user:(string),
			password:(string),
			algo:(string),
			idle:(number),
			disableDeflate:(bool),
			keepBrokenTunnel:(number),
			keyLength:(number),
			connectionPerRequest:(bool),
			connectionPerTarget:(bool),
			connectionPerTCP:(bool),
			connectionPerUDP:(bool),
			connectionForUDP:(bool),
		},
		...
	],
	socksMap: (array) [
		{...}
	]

*/

'use strict';


const configStore=require('electron-store'),
	Path=require('path');
//load config
const configOpt={};
if(process.platform!=='drawin')//change userdata path to working directory on platforms except macos
	configOpt.cwd=Path.resolve(__dirname,'../data');
global.clientConfig=new configStore(configOpt);
console.debug("config",clientConfig.path,clientConfig.store)


