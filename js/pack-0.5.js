
// 常见的  函数封装 
var $$ = function ( obj ) {
	if (document.querySelector) {
		var aObj = document.querySelectorAll(obj);
		if (aObj.length === 1)
			return aObj[0];
		else 
			return aObj;
	} else {  //如果浏览器不兼容queryselector 属性 采用方案 (目前只能获取最简单的纯id 和class选择器的节点)
		if (obj[0] == '#') {  //id获取DOM
			return document.getElementById(obj.replace(/\#/,''));
		} else if (obj[0] == '.') { //class获取DOM
			var arr = [];
			var classN = obj.replace(/\./,'');
			if ( document.getElementsByClassName ) {
				arr = document.getElementsByClassName( classN );   
			} else { //IE8如果不兼容ClassName的情况  
				var allElements = document.getElementsByTagName('*');
				var reg = RegExp('\\b' + classN + '\\b');
				for (var i = 0; i < allElements.length; i++) {
					if (reg.test(allElements[i].className)) {
						arr.push(allElements[i]);
					}
				}
			}
			return arr;
		}
	}
},
hasClass = function ( ele , classN ) {
	var reg = new RegExp('\\b' + classN + '\\b');
	return reg.test( ele.className ); 
},
addClass = function ( ele , classN ) {
	if (ele.length == undefined) {
		if (!hasClass(ele,classN)) {
			if (ele.className) { //如果dom对象有classname
				var classArry = ele.className.split(' ');
				classArry.push(classN); //
			}else {
				var classArry = [];
				classArry.push(classN);
			}
		var fixArray = [];  //清除class之间可能存在的多个空格
		for (var i = 0; i < classArry.length; i++) {
			if (classArry[i] != '') {
				fixArray.push(classArry[i])
			};
		};
		ele.className = fixArray.join(' ');
		};
	} else {
		console.log('this i an array;')
		var l = ele.length;
		console.log(l)
		for (var g = 0; g < l; g++) {
			if (!hasClass(ele[g],classN)) {
				console.log(ele)
				if (ele[g].className) { //如果dom对象有classname
					var classArry = ele[g].className.split(' ');
					classArry.push(classN); //xxx
				}else {
					console.log('ele hasClass')
					var classArry = [];
					classArry.push(classN);
				}
			var fixArray = [];  //清除class之间可能存在的多个空格
			for (var i = 0; i < classArry.length; i++) {
				if (classArry[i] != '') {
					fixArray.push(classArry[i])
				};
			};
			ele[g].className = fixArray.join(' ');
			};
		}
	}
},
// addStyle = function (ele,obj) {  //直接增加样式 语句 addStyle(ele,{height:'500px',display:'block'})....
// 	if (ele.length == undefined) {  //元素只有一个
// 		for (attr in obj) {
// 			(ele.style)[attr] = obj[attr]
// 		}
// 	} else {  //元素是数组含有多个
// 		var l = ele.length;
// 		for (var i = 0; i < l; i++) {
// 			for (attr in obj) {
// 				(ele[i].style)[attr] = obj[attr];
// 				console.log((ele[i].style).backgroundColor)
// 			}
// 		}
// 	}
// },
// removeStyle = function (ele,obj) {
// 	if (ele.length == undefined) {
// 		for (attr in obj) {
// 			(ele.style)[attr] = '';
// 		}
// 	} else {
// 		var l = ele.length;
// 		for (var i = 0; i < l; i++) {
// 			for (attr in obj) {
// 				(ele[i].style)[attr] = '';
// 			}
// 		}
// 	}	
// },
removeClass = function ( ele , classN ) {
	if (ele.length == undefined) {
		if (hasClass(ele,classN)) {
			var reg = RegExp('\\b' + classN + '\\b');
			ele.className = ele.className.replace(reg,'')
		}
	} else if (ele.length >= 1) {
		var l = ele.length;
		for (var i = 0; i < l; i++) {
			if (hasClass(ele[i],classN)) {
				var reg = RegExp('\\b' + classN + '\\b');
				ele[i].className = ele[i].className.replace(reg,'')
			}
		}
	}
},
getStyle = function ( obj , attr ) {
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
},
getIntStyle = function (obj , attr) {
	return obj.currentStyle? parseInt(obj.currentStyle[attr]) : parseInt(getComputedStyle(obj)[attr]);
},
on = function ( obj , evName , evFn  , boolean ) {  /*绑定事件 (支持数组dom）*/	
	var bl = boolean? boolean : false;  /*有没有第四个参数*/
	if (obj.length == undefined ) {
		console.log(obj);
		if  (obj.addEventListener ) {
			obj.addEventListener(evName, evFn ,bl)
		}else {
			obj.attachEvent('on' + evName ,function () {
				evFn.call(obj);    //IE8 里面this 指向window 
			})
		}
	} else if (obj.length >= 1) {
		var l = obj.length;
		if (obj[0].addEventListener) {
			for (var i = 0; i < l; i++) {
				obj[i].index = i;
				obj[i].addEventListener(evName, evFn ,bl)
			}
		} else {
			for (var i = 0; i < l; i++) {
				obj[i].index = i;
				obj[i].attachEvent('on' + evName,function(){
					evFn.call(obj);  //IE8 里this 指向window
				})
			}
		}
	}
},
getObjectURL = function (file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
ajax = function ( json ) {
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),  //兼容老版本IE 
	method = json.method || 'get',
	aysn = json.aysn || true,
	data = json.data || '',
	success = json.success;
	error = json.error;
	url = json.url;
	if ( method.toLowerCase() === 'get' ) 
		url += '?'+data+'&'+new Date().getTime();
	xhr.open( method, url , aysn);
	xhr.setRequestHeader('content-type' , 'application/x-www-form-urlencoded');
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if ( xhr.readyState == 4 ) {
			if ( xhr.status >= 200 && xhr.status < 300 )
				success && success(xhr.responseText);
			else
				error && error();
		}
	}
},
toggleClass = function (obj, classN) {
	if (obj.length == undefined) {
		console.log('undefined')
		if (hasClass(obj,classN)) {
			removeClass(obj,classN);
		} else {
			addClass(obj,classN);
		}
	} else {
		var l = obj.length;
		for (var i = 0; i < l; i++) {
			if (hasClass(obj[i],classN)) {
				removeClass(obj[i],classN);
			} else {
				addClass(obj[i],classN);
			}
		}
	}
},
getWinWidth = function () {
	var winWidth;
	if (window.innerWidth)
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	return winWidth;
},
getWinHeight = function () {
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	return winHeight;
},
// 定时器运动函数封装
move = function ( obj , targetJson , time , cv , fn ) {
	var startTime = new Date(); //程序开始执行的时间 
	var startVal = {}; //新进一个用来存放所需要属性的对象
	for ( var i in targetJson ) //遍历改变的属性
	{
		startVal[i] = parseInt( getStyle( obj , i ) ); 
	}
	var timer = setInterval(function(){
		var t = new Date() - startTime; //现在和开始执行的时间差
		var d = time;  //目标时间
		if ( t >= d ) 
		{
			t = d;
			clearInterval( timer ); 
			fn && fn();   //避免了不存在回调函数参数会产生bug的问题
		}
		for ( var key in targetJson )
		{
			var b = startVal[key];
			var c = parseInt( targetJson[key] ) - b;
			obj.style[key] = Tween[cv]( t , b , c , d ) + 'px';
		}
	},13)
},
siblings = function (ele) {
	var Nodes = [],
	    firstNode = ele.parentNode.firstChild,
	    _ele = firstNode;
    if (_ele.nodeType === 1) Nodes.push(_ele);
	while (_ele.nextSibling != null) {
		console.log(_ele)
		_ele = _ele.nextSibling;
		if (_ele.nodeType === 1 ) {
			Nodes.push(_ele);
		}
	}
    return Nodes;
},
removeSiblingsClass = function (ele,classN) {
	removeClass(siblings(ele),classN)
},
Tween = {  //Tween 算法   t：执行时时间   b：变化属性  c：当前时间  时间差  d：
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
