
window.onload = function() {
	var oUl = document.getElementsByTagName('ul')[3];
	var aLi = oUl.getElementsByTagName('li');
	for(var i = 0, len = aLi.length; i < len; i++) {
		aLi[i].onmousemove = function() {
//			var _top = this.offsetTop;
			var _menu = this.getElementsByTagName('div')[0];
			//因为原生js无法获取隐藏元素的高度，通过自定义属性存储高度，再取出
//			var _height = Math.round(_menu.getAttribute('data-height') / 2);
//			console.log(_height)
//			if(_top < _height) { //如果_top小于 二级菜单框  的一般高度
//				_top = 0; //二级菜单局顶显示
//			} else { //否则  二级菜单  在  一级菜单  的“正右方”
//				_top = -_height;
//			}
//			_menu.style.top = _top + 'px';
			_menu.style.display = "block";
			this.className = "bor";
		}
		aLi[i].onmouseout = function() {
			var _menu = this.getElementsByTagName('div')[0];
			_menu.style.display = "none";
			this.className = ""
		}
	}
}

document.getElementById("shoujiban").onmouseover = function() {
	document.getElementById("b").style.display = "block";
}
document.getElementById("shoujiban").onmouseout = function() {
	document.getElementById("b").style.display = "none";
}




//banner开始
var btnL = document.querySelector('.btn-l'),
	btnR = document.querySelector('.btn-r'),
	bannerBox = document.querySelector('.banner-box'),
	botBox = document.querySelector('.bot-box'),
	bots = botBox.querySelectorAll('li'),
	num = 0;
//
setInterval(function() {
		console.log(num)
		num++;
		if(num >= 4) {
			num = 0;
		}
		if(num < 0) {
			num = bots.length - 1;
		}
		console.log(num)
		move(bannerBox, {
			marginLeft: -num * 770
		})
		for(var i = 0, len = bots.length; i < len; i++) {
			bots[i].className = "";
		}
		bots[num].className = "active";
	}, 2500)
	//
btnR.onclick = function() {
	num++;
	if(num === bots.length) {
		num = 0;
	}
	move(bannerBox, {
		marginLeft: -num * 770
	})
	for(var i = 0, len = bots.length; i < len; i++) {
		bots[i].className = "";
	}
	bots[num].className = "active";
}
btnL.onclick = function() {
	console.log(num)
	num--;
	if(num < 0) {
		num = bots.length - 1;
	}
	console.log(num)
	move(bannerBox, {
		marginLeft: -num * 770
	})
	for(var i = 0, len = bots.length; i < len; i++) {
		bots[i].className = "";
	}
	bots[num].className = "active";
}
for(var i = 0, len = bots.length; i < len; i++) {
	bots[i].index = i;
	bots[i].onmouseover = function() {
		//alert(this.index)
		num = this.index;
		move(bannerBox, {
			marginLeft: -num * 770
		})
		for(var j = 0; j < bots.length; j++) {
			bots[j].className = "";
		}
		this.className = "active";
	}
}
//将速度去掉,速度靠计算得到
function move(obj, json, fn) {
	clearInterval(obj.timer);
	var cur = 0;
	obj.timer = setInterval(function() {
		var isTrue = true;
		for(var attr in json) {
			//如果attr是opacity
			if(attr === "opacity") {
				cur = Math.round(getStyle(obj, attr) * 100);
			} else {
				cur = parseInt(getStyle(obj, attr));
			}

			speed = (json[attr] - cur) / 8;
			//对速度取整
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(cur !== json[attr]) {
				isTrue = false;
				if(attr === "opacity") {
					obj.style.opacity = (cur + speed) / 100
					obj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
				} else {
					obj.style[attr] = cur + speed + 'px';
				}
			}
		}
		console.log(isTrue)
			//等所有属性都到达目标值  再结束动画
		if(isTrue) {
			clearInterval(obj.timer);
			fn && fn.call(obj);
		}
	}, 30)
}

function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
//banner结束