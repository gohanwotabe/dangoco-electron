//client version
$('#client_version').innerText=require('../../../package.json').version;

//set dangoco version
$('#dangoco_version').innerText=require('dangoco/package.json').version;

//uptime
const ele_dangoco_uptime=$('#dangoco_uptime');
function formatTime(sec,total=sec){
	sec|=sec;
	let r,
		s=sec|0,
		h=(s/3600)|0;
	if(total>=3600)s=s%3600;
	r=[String((s/60)|0).padStart(2,'0'),String(s%60).padStart(2,'0')];
	(total>=3600)&&r.unshift(String(h).padStart(2,'0'));
	return r.join(':');
}
setInterval(()=>{
	ele_dangoco_uptime.innerText=formatTime(remoteProcess.uptime());
},1000);

//language list
const ele_client_language=$('#client_language');
let langs=i18n.getLocales();
langs.unshift('auto');
for(let lang of langs){
	let opt=document.createElement('option');
	opt.value=lang;
	opt.innerHTML=__('_lang_'+lang+'_');
	ele_client_language.appendChild(opt);
}
ele_client_language.value=i18n.getLocale();
ele_client_language.addEventListener('change',()=>{
	clientConfig.set('language',ele_client_language.value);
	i18n.setLanguage(ele_client_language.value);
	location.reload();
});