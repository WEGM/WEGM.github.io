
var getQueryString = function( name ) {
    var currentSearch = decodeURIComponent( location.search.slice( 1 ) );
    if ( currentSearch != '' ) {
        var paras = currentSearch.split( '&' );
        for ( var i = 0, l = paras.length, items; i < l; i++ ) {
            items = paras[i].split( '=' );
            if ( items[0] === name) {
                return items[1];
            }
        }
        return '';
    }
    return '';
};
/**
 * 给链接后增加参数
 * @param sourceUrl 链接地址
 * @param parameterName 参数名
 * @param parameterValue 参数值
 * @param replaceDuplicates 是否替换原值
 * @returns {string}
 */
var add_param = function(sourceUrl, parameterName, parameterValue, replaceDuplicates) {
	if ((sourceUrl == null) || (sourceUrl.length == 0)) {
		sourceUrl = document.location.href;
	}
	var urlParts = sourceUrl.split("?");
	var newQueryString = "";
	if (urlParts.length > 1) {
		var parameters = urlParts[1].split("&");
		for ( var i = 0; (i < parameters.length); i++) {
			var parameterParts = parameters[i].split("=");
			if (!(replaceDuplicates && parameterParts[0] == parameterName)) {
				if (newQueryString == "") {
					newQueryString = "?";
				} else {
					newQueryString += "&";
				}
				newQueryString += parameterParts[0] + "=" + parameterParts[1];
			}
		}
	}

	if (parameterValue !== null) {
		if (newQueryString == "") {
			newQueryString = "?";
		} else {
			newQueryString += "&";
		}
		newQueryString += parameterName + "=" + parameterValue;
	}
	return urlParts[0] + newQueryString;
};
/**
 * 删除链接参数
 * @param url 链接地址
 * @param ref 参数名
 * @returns {*}
 */
var delQueStr = function(url, ref){
	var str = "";

	if (url.indexOf('?') != -1)
		str = url.substr(url.indexOf('?') + 1);
	else
		return url;
	var arr = "";
	var returnurl = "";
	var setparam = "";
	if (str.indexOf('&') != -1) {
		arr = str.split('&');
		for (i in arr) {
			if (arr[i].split('=')[0] != ref) {
				returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
			}
		}
		return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
	}
	else {
		arr = str.split('=');
		if (arr[0] == ref)
			return url.substr(0, url.indexOf('?'));
		else
			return url;
	}
};

var cleanUrl = function(url) {
	var target = url || location.href;
	target = target.replace('game', '').replace('music','');
	target = delQueStr(target, 'singerId');
	target = delQueStr(target, 'activityId');
	if (target.indexOf('bu') === -1) {
		target = add_param(target, 'bu', getData('local_barUuid'))
	}
	return target;
};

/**
 * 替换链接参数的值
 * @param href 链接地址
 * @param paramName 参数名
 * @param replaceWith 替换后的参数值
 * @returns {XML|void|string}
 */
var replaceParamVal = function(href,paramName,replaceWith) {
	var re=eval('/('+ paramName+'=)([^&]*)/gi');
	var nUrl = href.replace(re,paramName+'='+replaceWith);
	return nUrl;
};


/**
 * 延迟地址跳转
 * @param url 链接地址
 */
var toUrl = function(url) {
	showLoading(null, '请稍后...');
	var delay = Math.ceil(1000*Math.random() + 1000);
	setTimeout(function(){window.location.href = url}, delay);
};

/**
 * 获取当天的多少天之前的日期字符串
 * @param n 天数
 * @returns {string|*} yyyy-mm-dd
 */
var getBeforeDate = function(n){
	var n = n;
	var d = new Date();
	var year = d.getFullYear();
	var mon=d.getMonth()+1;
	var day=d.getDate();
	if(day <= n){
		if(mon>1) {
			mon=mon-1;
		}
		else {
			year = year-1;
			mon = 12;
		}
	}
	d.setDate(d.getDate()-n);
	year = d.getFullYear();
	mon=d.getMonth()+1;
	day=d.getDate();
	s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
	return s;
};
/**
 * 將毫秒轉化為yyyy-MM-dd HH:mm:ss格式的日期
 * @param TimeMillis 时间戳
 * @returns {string}
 */
var timeTransform = function(TimeMillis){
	var data = new Date(TimeMillis);
	var year = data.getFullYear();  //获取年
	var month = data.getMonth()>=9?(data.getMonth()+1).toString():'0' + (data.getMonth()+1);//获取月
	var day = data.getDate()>9?data.getDate().toString():'0' + data.getDate(); //获取日
	var hours = data.getHours()>9?data.getHours().toString():'0' + data.getHours();
	var minutes = data.getMinutes()>9?data.getMinutes().toString():'0' + data.getMinutes();
	var ss = data.getSeconds()>9?data.getSeconds().toString():'0' + data.getSeconds();
	var time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":"+ ss;
	return time;
};
/**
 * 时间戳时间格式化
 * @param stamp 时间戳
 * @param format 格式
 * @param zero 是否用0补齐
 * @returns {string|*}
 */
var normalDate = function(stamp, format, zero) {
	var stamp = Number(stamp),
		date = new Date(stamp), formatDate,
		format = format ? format : "yyyy-mm-dd hh:ii:ss",
		zero = (zero === undefined) ? true : zero,
		dateNum = function(num) { return num < 10 ? '0' + num : num; },
		_d = zero ? dateNum : function(s){return s;};

	var year = _d(date.getFullYear()),
		month = _d(date.getMonth() + 1),
		day = _d(date.getDate()),
		hour = _d(date.getHours()),
		minute = _d(date.getMinutes()),
		second = _d(date.getSeconds());

	formatDate = format.replace(/yyyy/i, year).replace(/mm/i, month).replace(/dd/i, day)
		.replace(/hh/i, hour).replace(/ii/i, minute).replace(/ss/i, second);
	return formatDate;
};
/**
 * 把字符串转换成Date对象
 * @param str
 * @returns {Date}
 */
var str2date = function(str) {
	str = str.replace(/-/g, '/');
	return new Date(str);
};
/**
 * 获取字符串格式之间的时间戳
 * @param str
 * @returns {number}
 */
var timestamp = function(str) {
	var timestamp = Date.parse(str2date(str));
	return timestamp;
};

/**
 * 日期对象格式化
 * @param date
 * @param format
 * @returns {XML|string}
 */
var dateformat = function(date, format) {
	var z = {
		M : date.getMonth() + 1,
		d : date.getDate(),
		h : date.getHours(),
		m : date.getMinutes(),
		s : date.getSeconds()
	};
	format = format.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
		return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2);
	});
	return format.replace(/(y+)/g, function(v) {
		return date.getFullYear().toString().slice(-v.length)
	});
};

var dateNum = function(num) {
	return num < 10 ? '0' + num : num;
};
/**
 * 时间比较
 * @param beginTime yy-mm-dd hh:mm:ss
 * @param endTime yy-mm-dd hh:mm:ss
 * @returns {number}return -1   beginTime > endTime
                    return 0    beginTime = endTime
                    return 1    beginTime < endTime
 */
var comptime = function(beginTime, endTime){
	var beginTimes=beginTime.substring(0,10).split('-');
	var endTimes=endTime.substring(0,10).split('-');
	beginTime=beginTimes[1]+'-'+beginTimes[2]+'-'+beginTimes[0]+' '+beginTime.substring(10,19);
	endTime=endTimes[1]+'-'+endTimes[2]+'-'+endTimes[0]+' '+endTime.substring(10,19);
	var a =(timestamp(endTime)-timestamp(beginTime))/3600/1000;
	if(a<0){
		return -1;
	}else if (a>0){
		return 1;
	}else if (a==0){
		return 0;
	}else{
		return -2
	}
};
/* 获取时间描述 */
var sweetTime = function(time) {
	let allTime = time;
	let nowTime = "";
	let lastTime = "";
	let showTime = timestamp(allTime);
	time = time.slice(-8);
	nowTime = new Date().getHours() * 60 * 60 * 1e3 + new Date().getMinutes() * 60 * 1e3 + new Date().getSeconds() * 1e3;
	lastTime = nowTime + 24 * 60 * 60 * 1e3;
	if (showTime > lastTime) {
		return allTime.replace("-", "年").replace("-", "月").replace(" ", "日 ").slice(0, 17);
	}
	if (showTime > nowTime && showTime < lastTime) {
		return "昨天 " + time.slice(0, 5);
	}
	if (showTime < nowTime) {
		return time.slice(0, 5);
	}
};

/**
 * showTips
 * @param word 提示信息
 * @param pos 位置
 * @param timer 停留时间
 */
var showTipsFlag = true;
var showTips = function(tips, timer) {
	if (tips == undefined) return;
	if (showTipsFlag) {
		showTipsFlag = false;
		$('body').append('<div class="showTips" style="position:fixed;max-width:80%;z-index:999999999999;color:rgb(39, 38, 38);padding:12px 18px;font-size:15px;border-radius:4px;background:#FFF;text-align:center;opacity:0">' + tips + '</div>');
		var winW = $(window).width(), winH = $(window).height(), tipsW = $('.showTips').width(), tipsH = $('.showTips').height(), timer = timer || 1200;
		$('.showTips').css({'left':(winW - tipsW)/2, 'top':(winH - tipsH)/2}).animate({'opacity': '1'}, 300, function() {
			setTimeout(function() {
                    $('.showTips').animate({'opacity':'0'}, 100, function() {
                        $('.showTips').remove();
                        showTipsFlag = true;
                    });
			}, timer);
		});
	};
};
/**
 * 返回给定范围内的随机数
 * @param min 范围下限（包含）
 * @param max 范围上限（不包含）
 * @returns {Number}
 */
var getRandomArbitrary = function(min, max) {
	return parseInt(Math.random()*(max - min)+min);
};

/**
 * 客户端是否andriod系统
 * @returns {boolean}
 */
var is_android = function() {
	var ua = navigator.userAgent.toLowerCase();
	return ua.indexOf("android") > -1;
};

var simpleTpl = function( tpl ) {
    tpl = $.isArray( tpl ) ? tpl.join( '' ) : (tpl || '');
    return {
        store: tpl,
        _: function() {
            var me = this;
            $.each( arguments, function( index, value ) {
                me.store += value;
            } );
            return this;
        },
        toString: function() {
            return this.store;
        }
    };
};

var setTitle = function(title) {
	document.title = title;
	var $body = $('body');
	var $iframe = $('<iframe style="display:none;" src="static/image/dot.png"></iframe>').on('load', function() {
			setTimeout(function() {$iframe.off('load').remove();
		}, 0)}).appendTo($body);
	};

var isWeixin = function() {
	return /micromessenger/.test(navigator.userAgent.toLowerCase())
};


var showLoading = function($container, tips) {
	var t = simpleTpl(), spinnerSize = 146,
		width = $(window).width(),
		height = $(window).height(),
		$container = $container || $('body'),
		$spinner = $container ? $container.find('#spinner') : $('body').children('#spinner'),
		tips = tips || '努力加载中...';
	
	if ($spinner.length > 0) {
		$spinner.remove();
	};
	t._('<div id="spinner" class="spinner">')
		._('<div class="new-spinner">')
			._('<div class="new-overlay"></div>')
				._('<div class="new-spinner-inner">')
					._('<p class="new-spinner-spinner"></p>')
					._('<p class="new-spinner-text">' + tips + '</p>')
				._('</div>')
			._('</div>')
		._('</div>')
	._('</div>');
	$spinner = $(t.toString()).css({'top': (height - spinnerSize) / 2, 'left': (width - spinnerSize) / 2});
	$container.append($spinner);
};

var hideLoading = function($container) {
	if ($container) {
		$container.find('.spinner').remove();
	} else {
		$('body').children('.spinner').remove();
	};
};

var saveData = function(key, value) {
	if (key) window.localStorage.setItem(key, $.trim(value));
};
var getData = function(key) {
	if (key) return window.localStorage.getItem(key) || '';
};
var delData = function(key) {
	if (key) window.localStorage.removeItem(key);
};
