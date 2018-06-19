var gamegiftHeader = (function(t, e) {
	var util = {},
		fn = {},
		init = function(){};

	fn = {
		jsLoader: function(url, callback, options) {
			options = options || {};
			var head = e.getElementsByTagName('head')[0] || e.documentElement,
				script = e.createElement('script'),
				done = false;
			script.src = url;
			if (options.charset) {controller
				script.charset = options.charset;
			}
			script.onerror = script.onload = script.onreadystatechange = function() {
				if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
					done = true;
					if (callback) {
						callback();
					}
					script.onerror = script.onload = script.onreadystatechange = null;
					head.removeChild(script);
				}
			};
			head.insertBefore(script, head.firstChild);
		}
	};

	util.addHeaderHTML = function() {
		var headerHTML = '';
		headerHTML +='<div class="hd-border none"></div>';
		headerHTML +='<div class="hd hd_left">';
		headerHTML +='    <div class="logo"><img src="statics/images/logo.png" alt="gameGift logo"></div>';
		headerHTML +='</div>';
		headerHTML +='<div class="hd hd_right">';
		headerHTML +='    <nav class="nav">';
		headerHTML +='        <ul class="nav-list">';
		headerHTML +='            <li class="nav-item">';
		headerHTML +='                <a href="#" class="nav-item_link">游戏专区</a>';
		headerHTML +='            </li>';
		headerHTML +='            <li class="nav-item">';
		headerHTML +='                <a href="#" class="nav-item_link">礼包中心</a>';
		headerHTML +='            </li>';
		headerHTML +='            <li class="nav-item">';
		headerHTML +='                <a href="#" class="nav-item_link">赛事直播</a>';
		headerHTML +='            </li>';
		headerHTML +='            <li class="nav-item">';
		headerHTML +='                <a href="#" class="nav-item_link">新游首发</a>';
		headerHTML +='            </li>';
		headerHTML +='            <li class="nav-item">';
		headerHTML +='                <a href="#" class="nav-item_link">排行榜</a>';
		headerHTML +='            </li>';
		headerHTML +='            <li class="nav-item">';
		headerHTML +='                <a href="#" class="nav-item_link">高清壁纸</a>';
		headerHTML +='            </li>';
		headerHTML +='        </ul>';
		headerHTML +='    </nav>';
		headerHTML +='    <div class="hd-controls">';
		headerHTML +='        <div class="hd-controls_item">';
		headerHTML +='            <button type="button" class="menu-button">';
		headerHTML +='                <svg width="60" height="60" viewBox="0 0 100 100" class="svg-container">';
		headerHTML +='                    <path d="M 100,0 L 100,100,0,100,0,0 Z" fill="none" class="svg-border"></path>';
		headerHTML +='                </svg>';
		headerHTML +='                <div class="menu-icon">';
		headerHTML +='                    <div class="line-container line-container-1">';
		headerHTML +='                        <span class="line line-1" style="transform: matrix(1, 0, 0, 1, 0, 0);"></span>';
		headerHTML +='                    </div>';
		headerHTML +='                    <div class="line-container line-container-2">';
		headerHTML +='                        <span class="line line-2"></span>';
		headerHTML +='                    </div>';
		headerHTML +='                    <div class="line-container line-container-3">';
		headerHTML +='                        <span class="line line-3" style="transform: matrix(1, 0, 0, 1, 0, 0);"></span>';
		headerHTML +='                    </div>';
		headerHTML +='                </div>';
		headerHTML +='            </button>';
		headerHTML +='        </div>';
		headerHTML +='        <div class="hd-controls_item">';
		headerHTML +='            <a href="#" target="_blank" class="social-button">';
		headerHTML +='                <svg width="60" height="60" viewBox="0 0 100 100" class="svg-container"><path d="M 100,0 L 100,100,0,100,0,0 Z" fill="none" class="svg-border"></path></svg>';
		headerHTML +='                <div class="social-button_icon">';
		headerHTML +='                    <img src="statics/images/wechat-logo.png" alt="wechat logo">';
		headerHTML +='                </div>';
		headerHTML +='            </a>';
		headerHTML +='        </div>';
		headerHTML +='        <div class="hd-controls_item">';
		headerHTML +='            <a href="https://www.weibo.com/gamegiftcn/" target="_blank" class="social-button">';
		headerHTML +='                <svg width="60" height="60" viewBox="0 0 100 100" class="svg-container"><path d="M 100,0 L 100,100,0,100,0,0 Z" fill="none" class="svg-border"></path></svg>';
		headerHTML +='                <div class="social-button_icon">';
		headerHTML +='                    <img src="statics/images/weibo-logo.png" alt="weibo logo">';
		headerHTML +='                </div>';
		headerHTML +='            </a>';
		headerHTML +='        </div>';
		headerHTML +='    </div>';
		headerHTML +='</div>';
		

		var headerDom = e.getElementById('header');
		if (headerDom) headerDom.parentNode.removeChild(headerDom);

		var t = e.createElement("div");
		t.className = "header",
		t.id = "header",
		t.innerHTML = headerHTML,
		e.body.appendChild(t);
	};

	util.headerFunc = function(){
		$('.menu-button').click(function(event) {
			$('.nav').toggleClass('fade-enter');
			$('.menu-button').toggleClass('is-collapsed');
			if ($('.nav').hasClass('fade-enter')) {
				$('.line-1, .line-3').css('transform', 'matrix(0.7071, 0.7071, -0.7071, 0.7071, 0, 0)');
			} else {
				$('.line-1, .line-3').css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
			}
		});
	};

	util.setKV = function(){
		var $wrapper = $(".wrapper");
		if(!$wrapper[0]){return}
		$.getScript("//game.qq.com/time/qqadv/Info_new_15191.js",function(){
			var kvPos = "pos16040";
			if(!oDaTaNew15191 || !oDaTaNew15191[kvPos]) return
				var kvImg = "//game.gtimg.cn/upload/adw/" + oDaTaNew15191[kvPos][2],
					kvLink = oDaTaNew15191[kvPos][1];
				$(".wrapper").css("background-image",'url(' + kvImg + ')');
				$("#kvLink").attr("url",kvLink);
				// console.log($(".wrapper").css("background-image"))
		})
	};

	util.setKVLink = function(){
		function setLink(){
			var link = $(".kv-bg .kv_link").attr("href");
			if(link){
				$("#header .kv-link").attr("href",link)
			}else{
				$("#header .kv-link").hide();
			}
		}
		setTimeout(setLink,500);
	};


	init = function() {
		function n() {
			util.addHeaderHTML();
			util.headerFunc();

			// util.addFooterHTML();
			// util.footerFunc();
			// util.setKV();
		}

		var libFile = (window.jQuery) ? "" : "//cdn.bootcss.com/jquery/3.3.1/jquery.min.js"
		libFile ? fn.jsLoader(libFile, n()) : n();
	};

	return{
		init : init
	}
}) (window, window.document);

gamegiftHeader.init();