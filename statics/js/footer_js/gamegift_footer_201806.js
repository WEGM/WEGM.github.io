var gamegiftFooter = (function(t, e) {
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

	util.addFooterHTML = function() {
		var footerHTML = '';
		footerHTML +='<p><span id="copyYear">2018</span>&nbsp;©&nbsp;游戏礼包&nbsp;&nbsp;gameGift.cn</p>';
		footerHTML +='<p>本站所有资源均来自网络，版权归原公司及个人所有。</p>';

		var footerDom = e.getElementById('footer');
		if (footerDom) footerDom.parentNode.removeChild(footerDom);

		var t = e.createElement("div");
		t.className = "footer",
		t.id = "footer",
		t.innerHTML = footerHTML,
		e.body.appendChild(t);
	};

	init = function() {
		function n() {
			util.addFooterHTML();
		}

		var libFile = (window.jQuery) ? "" : "//cdn.bootcss.com/jquery/3.3.1/jquery.min.js"
		libFile ? fn.jsLoader(libFile, n()) : n();
	};

	return{
		init : init
	}
}) (window, window.document);

gamegiftFooter.init();