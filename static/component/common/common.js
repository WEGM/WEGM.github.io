var W = W || window;
var __ns = function( fullNs ) {
	var nsArray = fullNs.split('.');
	var evalStr = '';
	var ns = '';
	for ( var i = 0, l = nsArray.length; i < l; i++ ) {
		i !== 0 && ( ns += '.' );
		ns += nsArray[i];
		evalStr += '( typeof ' + ns + ' === "undefined" && (' + ns + ' = {}) );';
	}
	evalStr !== '' && eval( evalStr );
};
__ns('H');

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

var saveData = function(key, value) {
	if (key) window.localStorage.setItem(key + '_' + openid + '_' + mpappid, $.trim(value));
};
var getData = function(key) {
	if (key) return window.localStorage.getItem(key + '_' + openid + '_' + mpappid) || '';
};
var delData = function(key) {
	if (key) window.localStorage.removeItem(key + '_' + openid + '_' + mpappid);
};

var getQueryString = function( name, url ) {
	if (!url) url = location.href;
	var target = url.split('?');
	if (url.indexOf('?') >= 0) {
		var temp = '';
		for(var i = 1; i < target.length; i++) {
			if (i == 1) {
				temp = target[i];
			} else {
				temp = temp + '&' + target[i];
			}
		};
		var currentSearch = decodeURIComponent(temp);
		if (currentSearch != '') {
			var paras = currentSearch.split('&');
			for ( var i = 0, l = paras.length, items; i < l; i++ ) {
				var ori = paras[i];
				if (paras[i].indexOf('#') >= 0) {
					paras[i] = paras[i].split('#')[0];
				}
				items = paras[i].split('=');
				if ( items[0] === name) return items[1];
			};
			return '';
		} else {
			return '';
		}
	} else {
		return '';
	}
};

var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
Math.sn = function (len, radix) {
	var chars = CHARS, sn = [], i;
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++) sn[i] = chars[0 | Math.random()*radix];
	} else {
		var r;
		sn[8] = sn[13] = sn[18] = sn[23] = '-';
		sn[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!sn[i]) {
				r = 0 | Math.random()*16;
				sn[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	var re = new RegExp("-", "g");
	return sn.join('').toLocaleLowerCase().replace(re, "");
};

var getResult = function(url, data, callback, showloading, $target, isAsync) {
	if (showloading) showLoading();
	$.ajax({
		type : 'GET',
		async : typeof isAsync === 'undefined' ? false : isAsync,
		url : domain_url + url + dev,
		data: data,
		dataType : "jsonp",
		jsonp : callback,
		complete: function() {
			if (showloading) hideLoading();
		},
		success : function(data) {}
	});
};

var getRandomArbitrary = function(min, max) {
	return parseInt(Math.random()*(max - min)+min);
};

$('body').append('<div id="J_GotoTop" class="elevator"><a href="" class="elevator-msg" target="_blank"><i class="icon-feedback"></i><span class="">联系我们</span></a><a href="mobile.html" target="_blank" class="elevator-app"><i class="icon-appdownload"></i><span class="">APP下载</span><div class="elevator-app-box"></div></a><a href="javascript:void(0)" class="elevator-weixin" id="js-elevator-weixin"><i class="icon-wxgzh"></i><span class="">官方微信</span><div class="elevator-weixin-box"></div></a><a href="javascript:void(0)" class="elevator-top no-goto" style="" id="backTop"><i class="icon-up2"></i><span class="">返回顶部</span></a></div>');
function isTop() {
	height = $(window).height(),
	scrollTop = $(document).scrollTop(),
	scrollTop >= 768 ? ($("#backTop").show(),
	$("#js-elevator-weixin").removeClass("no-goto")) : ($("#backTop").hide(),
	$("#js-elevator-weixin").addClass("no-goto"))
};
isTop();
$(window).scroll(function() {
	isTop();
});

$("#backTop").click(function() {
	$("html,body").animate({
		scrollTop: 0
	}, 200)
});

var classTpl = simpleTpl();
classTpl._('<div class="lists-content-card col-lg-3 col-md-6 col-sm-6 col-xs-12">')
	._('<a target="_blank" class="course-card g-shadow" href="courselist.html?from=index">')
		._('<div class="course-card-cover" style="background:url(/static/images/classcover/cover.jpg) center center no-repeat;background-size:cover;"></div>')
		._('<div class="course-card-content">')
			._('<h3 class="course-card-name ui-nowrap-multi">BAT大咖助力 全面升级Android面试BAT大咖助力 全面升级Android面试BAT大咖助力 全面升级Android面试</h3>')
			._('<p class="course-card-intro ui-nowrap-multi">2017最全面，见效最快的Android面试课程，赢取满意offer的不二之选2017最全面，见效最快的Android面试课程，赢取满意offer的不二之选2017最全面，见效最快的Android面试课程，赢取满意offer的不二之选2017最全面，见效最快的Android面试课程，赢取满意offer的不二之选</p>')
			._('<div class="clearfix course-card-bottom">')
				._('<div class="course-card-teacher">')
					._('<div class="course-card-teacher-avatar">')
						._('<img src="/static/images/avatar/avatar01.png">')
					._('</div>')
					._('<p class="course-card-teacher-name">老师姓名</p>')
				._('</div>')
				._('<div class="course-card-info">564人在学</div>')
			._('</div>')
		._('</div>')
	._('</a>')
._('</div>');

var teacherTpl = simpleTpl();
teacherTpl._('<div class="lists-content-card col-lg-2-4 col-md-3 col-sm-3 col-xs-6">')
	._('<a target="_blank" class="teacher-card g-shadow" href="lecturerdetail.html?from=index">')
		._('<div class="teacher-card-cover" style="background:url(/static/images/avatar/avatar2.jpg) center center no-repeat;background-size:cover;"></div>')
		._('<div class="teacher-card-content">')
			._('<h3 class="teacher-card-name ui-nowrap-flex">教师姓名</h3>')
			._('<p class="teacher-card-school ui-nowrap-flex">清华大学研究生讲师</p>')
			._('<p class="teacher-card-detail ui-nowrap-multi-4">拥有多年带领华为数据挖掘团队给全世界范围内著名运营商提供大数据解决方案的经验所带领的团队主要负责处理、挖掘和分析每天数以TB计的数据。作为一个带领拥有20人团队成功完成多个全球项目的leader,非常了解当今用途</p>')
		._('</div>')
	._('</a>')
._('</div>');

var articleTpl = simpleTpl();
articleTpl._('<p class="clearfix">')
	._('<a class="label" href="">MongoDB</a>')
	._('<i>•</i>')
	._('<a target="_blank" href="forumdetail.html?from=index" class="content ui-nowrap-multi">MongoDB给数据库创建用户</a>')
._('</p>');

var historyTpl = simpleTpl();
historyTpl._('<div class="clearfix tl-item ">')
	._('<span class="time">')
		._('<b>2017</b>')
		._('<em>07月01日</em>')
	._('</span>')
	._('<div class="course-list course-list-m">')
		._('<ul class="clearfix">')
			._('<li class="course-one">')
				._('<div class="course-list-img fl">')
					._('<a href="courselist.html?from=user" target="_blank">')
						._('<img width="200" height="113" alt="课程名称" src="/static/images/classcover/course1.jpg">')
					._('</a>')
				._('</div>')
				._('<div class="course-list-cont">')
					._('<h3 class="study-hd">')
						._('<a href="courselist.html?from=user" target="_blank">课程名称</a>')
						._('<span class="i-new">更新完毕</span>')
					._('</h3>')
					._('<div class="study-points">')
						._('<span class="i-left span-common">已学26%</span>')
						._('<span class="i-mid span-common">用时 86分</span>')
						._('<span class="i-right span-common">学习至3-1 课程名称</span>')
					._('</div>')
					._('<div class="catog-points">')
						._('<span class="i-left span-common"><a href="courselist.html?from=user">笔记 <i>0</i></a></span>')
						._('<span class="i-mid span-common"><a href="courselist.html?from=user">代码 <i>0</i></a></span>')
						._('<span class="i-right span-common"><a href="courselist.html?from=user">问答 <i>0</i></a></span>')
						._('<a href="courselist.html?from=user" target="_blank" class="btn-red continute-btn">继续学习</a>')
					._('</div>')
				._('</div>')
			._('</li>')
		._('</ul>')
	._('</div>')
._('</div>');



// <div class="mod-popup popup mod-login none">
// 	<div class="popup-wrap">
// 		<a href="" class="btn-popup-close close"><i class="icon-close"></i></a>
// 		<div class="popup-hd">
// 			<p class="title">账号密码登录</p>
// 		</div>
// 		<div class="popup-bd">
// 			<form action="" method="post" class="popup-form">
// 				<div class="popup-input">
// 					<input type="text" name="email" placeholder="手机号或邮箱" class="clear-input">
// 					<input name="password" type="password" placeholder="密码" class="clear-input">
// 				</div>
// 				<a href="javascript:;" class="btn"><span class="text">立即登录</span></a>
// 			</form>
// 			<a class="reset-password red-link">忘记密码？</a>
// 			<div class="switch-back">还没有账号？<a class="red-link">立即注册</a></div>
// 		</div>
// 	</div>
// </div>

// <div class="mod-popup popup mod-sign none">
// 	<div class="popup-wrap">
// 		<a href="" class="btn-popup-close close"><i class="icon-close"></i></a>
// 		<div class="popup-hd">
// 			<p class="title">注册账号</p>
// 		</div>
// 		<div class="popup-bd">
// 			<form action="" method="post" class="popup-form">
// 				<div class="popup-input">
// 					<input type="text" name="email" placeholder="手机号或邮箱" class="clear-input">
// 					<input type="text" name="nickname" placeholder="用户名" class="clear-input">
// 					<input name="password" type="password" placeholder="密码" class="clear-input">
// 					<input name="password_repeat" type="password" placeholder="重复密码" class="clear-input">
// 					<div class="radio-wrap">
// 						<span class="active">学生</span> 
// 						<span>老师</span> 
// 					</div>
// 				</div>
// 				<label for="agree" class="checkbox">
// 					&nbsp;我已阅读并同意相关服务条款和隐私政策
// 				</label>
// 				<a href="javascript:;" class="btn"><span class="text">立即注册</span></a>
// 			</form>
// 			<a class="reset-password red-link">忘记密码？</a>
// 			<div class="switch-back">已有账号？<a class="red-link">立即登录</a></div>
// 		</div>
// 	</div>
// </div>

// <div class="mod-popup popup mod-reset none">
// 	<div class="popup-wrap">
// 		<a href="" class="btn-popup-close close"><i class="icon-close"></i></a>
// 		<div class="popup-hd">
// 			<p class="title">找回密码</p>
// 		</div>
// 		<div class="popup-bd">
// 			<form action="" method="post" class="popup-form">
// 				<div class="popup-input">
// 					<input type="text" name="email" placeholder="手机号或邮箱" class="clear-input">
// 				</div>
// 				<a href="javascript:;" class="btn"><span class="text">立即重置</span></a>
// 			</form>
// 			<div class="switch-back">又想起来了？<a class="red-link">立即登录</a></div>
// 		</div>
// 	</div>
// </div>

// <div class="mod-popup popup mod-info none1">
// 	<div class="popup-wrap">
// 		<a href="" class="btn-popup-close close"><i class="icon-close"></i></a>
// 		<div class="popup-hd">
// 			<p class="title">修改个人信息</p>
// 		</div>
// 		<div class="popup-bd">
// 			<form action="" method="post" class="popup-form">
// 				<div class="popup-input">
// 					<input type="text" name="email" placeholder="手机号或邮箱" class="clear-input">
// 					<input type="text" name="nickname" placeholder="用户名" class="clear-input">
// 					<input name="password" type="password" placeholder="密码" class="clear-input">
// 					<input name="password_repeat" type="password" placeholder="重复密码" class="clear-input">
// 					<div class="radio-wrap">
// 						<span class="active">学生</span> 
// 						<span>老师</span> 
// 					</div>
// 				</div>
// 				<label for="agree" class="checkbox">
// 					&nbsp;我已阅读并同意相关服务条款和隐私政策
// 				</label>
// 				<div class="btn-box">
					
// 				</div>
// 				<a href="javascript:;" class="btn"><span class="text">立即注册</span></a>
// 			</form>
// 			<div class="switch-back"><a class="red-link">更换头像？</a></div>
// 		</div>
// 	</div>
// </div>