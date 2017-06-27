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

$('body').append('<div id="J_GotoTop" class="elevator"><a href="" class="elevator-msg" target="_blank"><i class="icon-feedback"></i><span class="">联系我们</span></a><a href="mobile.html" target="_blank" class="elevator-app"><i class="icon-appdownload"></i><span class="">APP下载</span><div class="elevator-app-box"></div></a><a href="javascript:void(0)" class="elevator-weixin" id="js-elevator-weixin"><i class="icon-wxgzh"></i><span class="">官方微信</span><div class="elevator-weixin-box"></div></a><a href="javascript:void(0)" class="elevator-top no-goto" style="" id="backTop"><i class="icon-up2"></i><span class="">返回顶部</span></a></div>');	
// <div id="J_GotoTop" class="elevator">
//     <a href="/user/feedback" class="elevator-msg" target="_blank">
//         <i class="icon-feedback"></i>
//         <span class="">意见反馈</span>
//     </a>
//     <a href="/about/faq" class="elevator-faq" target="_blank">
//         <i class="icon-ques"></i>
//         <span class="">常见问题</span>
//     </a>
//     <a href="http://www.imooc.com/mobile/app" target="_blank" class="elevator-app">
//         <i class="icon-appdownload"></i>
//         <span class="">APP下载</span>
//         <div class="elevator-app-box"></div>
//     </a>
//     <a href="javascript:void(0)" class="elevator-weixin" id="js-elevator-weixin">
//         <i class="icon-wxgzh"></i>
//         <span class="">官方微信</span>
//         <div class="elevator-weixin-box"></div>
//     </a>
//     <a href="javascript:void(0)" class="elevator-top no-goto" style="" id="backTop">
//         <i class="icon-up2"></i>
//         <span class="">返回顶部</span>
//     </a>
// </div>

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