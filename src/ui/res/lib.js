/*element drag event*/
//touch drag
(function(){
var extendEventDefaultOpt={
	touchdrag:{
		preventDefault:true,
		allowMultiTouch:false,
	},
	mousedrag:{
		preventDefault:true,
	},
}
//for mouse
let mouseDragingElement=null,mousedragging=false;
function mousedown(e){
	this._mouseDragStat={x:e.clientX,y:e.clientY};
	mouseDragingElement=this;
	window.addEventListener('mousemove',mousemove);	
}
function mousemove(e){
	if(!mousedragging){
		let event=new MouseEvent('mousedragstart',e);
		mouseDragingElement.dispatchEvent(event);
		mousedragging=true;
	}
	let stats=mouseDragingElement._mouseDragStat,opt=mouseDragingElement._mouseDragOptions;
	if(opt.preventDefault)e.preventDefault();
	var event=new MouseEvent('mousedragmove',e);
	event.deltaX=e.clientX-stats.x;
	event.deltaY=e.clientY-stats.y;
	mouseDragingElement._mouseDragStat={x:e.clientX,y:e.clientY};
	mouseDragingElement.dispatchEvent(event);
}
window.addEventListener('mouseup',e=>{
	if(mouseDragingElement){
		var event=new MouseEvent('mousedragend',e);
		mouseDragingElement.dispatchEvent(event);
		mouseDragingElement=null;
		window.removeEventListener('mousemove',mousemove);
	}
});

//for touching
function touchstart(e){
	let stats=this._touchDragStats;
	if(!this._touchDragOptions.allowMultiTouch && e.changedTouches.length>1){stats={};return;}
	var ct=e.changedTouches;
	for(var t=ct.length;t--;){
		stats[ct[t].identifier]={x:ct[t].clientX,y:ct[t].clientY,dragging:false};
	}
}
function touchmove(e){
	let stats=this._touchDragStats,opt=this._touchDragOptions;
	if(!opt.allowMultiTouch && e.touches.length>1){stats={};return;}
	var ct=e.changedTouches;
	for(var t=ct.length;t--;){
		var id=ct[t].identifier;
		if(!id in stats)continue;
		if(!stats[id].dragging){
			let event=new TouchEvent('touchdragstart',e);
			this.dispatchEvent(event);
			stats[id].dragging=true;
		}
		var event=new TouchEvent('touchdragmove',e);
		event.deltaX=ct[t].clientX-stats[id].x;
		event.deltaY=ct[t].clientY-stats[id].y;
		stats[id].x=ct[t].clientX;
		stats[id].y=ct[t].clientY;
		this.dispatchEvent(event);
	}
	if(opt.preventDefault)e.preventDefault();
}
function touchend(e){
	let stats=this._touchDragStats;
	var ct=e.changedTouches;
	for(var t=ct.length;t--;){
		var id=ct[t].identifier;
		if(id in stats){
			let event=new TouchEvent('touchdragend',e);
			this.dispatchEvent(event);
			delete stats[id];
		}
	}
}

window.extendEvent={//扩展事件
	touchdrag(element,opt){
		/*
			add events:
				touchdragstart:(e:touchmove)
				touchdragmove:(e:touchmove+{deltaX,deltaY})
				touchdragend:(e:touchend)
		*/
		element._touchDragStats={};
		element._touchDragOptions=Object.assign({},extendEventDefaultOpt.touchdrag,opt);
		element.addEventListener('touchstart',touchstart);
		element.addEventListener('touchmove',touchmove);
		element.addEventListener('touchend',touchend);
	},
	disableTouchDrag(element){
		delete element._touchDragStats;
		delete element._touchDragOptions;
		element.removeEventListener('touchstart',touchstart);
		element.removeEventListener('touchmove',touchmove);
		element.removeEventListener('touchend',touchend);
	},
	mousedrag(element,opt){
		/*
			add events:
				mousedragstart:(e:mousemove)
				mousedragmove(e:mousemove+{deltaX,deltaY})
				mousedragend(e:mouseup)
		*/
		element._mouseDragStat={};
		element._mouseDragOptions=Object.assign({},extendEventDefaultOpt.mousedrag,opt);
		element.addEventListener('mousedown',mousedown);
		element.addEventListener('mouseup',mousedown);
	},
	disableMouseDrag(element){
		delete element._mouseDragStat;
		delete element._mouseDragOptions;
		element.removeEventListener('mousedown',mousedown);
		element.removeEventListener('mouseup',mousedown);
	},
}
})();
