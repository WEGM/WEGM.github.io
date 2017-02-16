;(function ($, window) {
    'use strict';
    var guid = 0,
        ignoredKeyCode = [9, 13, 17, 19, 20, 27, 33, 34, 35, 36, 37, 39, 44, 92, 113, 114, 115, 118, 119, 120, 122, 123, 144, 145],
        allowOptions = [
            'source',
            'empty',
            'limit',
            'cache',
            'focusOpen',
            'selectFirst',
            'changeWhenSelect',
            'highlightMatches',
            'ignoredKeyCode',
            'customLabel',
            'customValue',
            'template',
            'offset',
            'combine',
            'callback',
            'minLength',
            'delay'
        ],
        userAgent = (window.navigator.userAgent||window.navigator.vendor||window.opera),
        isFirefox = /Firefox/i.test(userAgent),
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(userAgent),
        isFirefoxMobile = (isFirefox && isMobile),
        $body = null,
        delayTimeout = null,
        localStorageKey = 'seedUISCache',
        supportLocalStorage = (function () {
            var supported = typeof window.localStorage !== 'undefined';

            if (supported) {
                try {
                    localStorage.setItem('seedUIS', 'seedUIS');
                    localStorage.removeItem('seedUIS');
                } catch (e) {
                    supported = false;
                }
            }

            return supported;
        })();

    
    var options = {
        source: null,
        asLocal: false,
        empty: true,
        limit: 10,
        minLength: 0,
        delay: 0,
        customClass: [],
        cache: true,
        focusOpen: true,
        hint: false,
        selectFirst: false,
        changeWhenSelect: true,
        highlightMatches: false,
        ignoredKeyCode: [],
        customLabel: false,
        customValue: false,
        template: false,
        offset: false,
        combine: $.noop,
        callback: $.noop
    };

    var publics = {
        
        defaults: function (opts) {
            options = $.extend(options, opts || {});

            return (typeof this === 'object') ? $(this) : true;
        },

        
        option: function (properties) {
            return $(this).each(function (i, input) {
                var data = $(input).next('.seedUIS').data('seedUIS');

                for (var property in properties) {
                    if ($.inArray(property, allowOptions) !== -1) {
                        data[property] = properties[property];
                    }
                }
            });
        },

        
        open: function () {
            return $(this).each(function (i, input) {
                var data = $(input).next('.seedUIS').data('seedUIS');

                if (data) {
                    _open(null, data);
                }
            });
        },

        
        close: function () {
            return $(this).each(function (i, input) {
                var data = $(input).next('.seedUIS').data('seedUIS');

                if (data) {
                    _close(null, data);
                }
            });
        },

        
        clearCache: function () {
            _deleteCache();
        },

        
        destroy: function () {
            return $(this).each(function (i, input) {
                var data = $(input).next('.seedUIS').data('seedUIS');

                if (data) {
                    
                    if (data.jqxhr) {
                        data.jqxhr.abort();
                    }

                    
                    if (data.$seedUIS.hasClass('open')) {
                        data.$seedUIS.find('.seedUIS-selected')
                                           .trigger('click.seedUIS');
                    }

                    
                    if (!data.originalAutocomplete) {
                        data.$node.removeAttr('autocomplete');
                    } else {
                        data.$node.attr('autocomplete', data.originalAutocomplete);
                    }

                    
                    data.$node.off('.seedUIS')
                               .removeClass('seedUIS-node');
                    data.$seedUIS.off('.seedUIS')
                                         .remove();
                }
            });
        }
    };

    
    function _init(opts) {
        
        opts = $.extend({}, options, opts || {});

        
        if ($body === null) {
            $body = $('body');
        }

        
        var $items = $(this);
        for (var i = 0, count = $items.length; i < count; i++) {
            _build($items.eq(i), opts);
        }

        return $items;
    }

    
    function _build($node, opts) {
        if (!$node.hasClass('seedUIS-node')) {
            
            opts = $.extend({}, opts, $node.data('seedUIS-options'));

            
            if (typeof opts.source === 'string' && (opts.source.slice(-5) === '.json' || opts.asLocal === true)) {
                $.ajax({
                    url: opts.source,
                    type: 'GET',
                    dataType: 'json',
                    async: false
                }).done(function (response) {
                    opts.source = response;
                });
            }

            var html = '<div class="seedUIS ' + opts.customClass.join(' ') + '" id="seedUIS-' + (guid + 1) + '">';

            if (opts.hint) {
                html += '<div class="seedUIS-hint"></div>';
            }

            html += '<ul class="seedUIS-list"></ul>';
            html += '</div>';

            $node.addClass('seedUIS-node')
                 .after(html);

            
            var $seedUIS = $node.next('.seedUIS').eq(0);

            
            var originalAutocomplete = $node.attr('autocomplete');
            $node.attr('autocomplete', 'off');

            
            var data = $.extend({
                $node: $node,
                $seedUIS: $seedUIS,
                $selected: null,
                $list: null,
                index: -1,
                hintText: false,
                source: false,
                jqxhr: false,
                response: null,
                focused: false,
                query: '',
                originalAutocomplete: originalAutocomplete,
                guid: guid++
            }, opts);

            
            data.$seedUIS.on('mousedown.seedUIS', '.seedUIS-item', data, _select)
                               .data('seedUIS', data);

            
            data.$node.on('keyup.seedUIS', data, _onKeyup)
                      .on('keydown.seedUIS', data, _onKeydown)
                      .on('focus.seedUIS', data, _onFocus)
                      .on('blur.seedUIS', data, _onBlur)
                      .on('mousedown.seedUIS', data, _onMousedown);
        }
    }

    
    function _search(query, source, data) {
        var response = [];

        query = query.toUpperCase();

        if (source.length) {
            for (var i = 0; i < 2; i++) {
                for (var item in source) {
                    if (response.length < data.limit) {
                        var label = (data.customLabel && source[item][data.customLabel]) ? source[item][data.customLabel] : source[item].label;

                        switch (i) {
                        case 0:
                            if (label.toUpperCase().search(query) === 0) {
                                response.push(source[item]);
                                delete source[item];
                            }
                            break;

                        case 1:
                            if (label.toUpperCase().search(query) !== -1) {
                                response.push(source[item]);
                                delete source[item];
                            }
                            break;
                        }
                    }
                }
            }
        }

        return response;
    }

    
    function _launch(data) {
        
        clearTimeout(delayTimeout);

        data.query = $.trim(data.$node.val());

        if ((!data.empty && data.query.length === 0) || (data.minLength && (data.query.length < data.minLength))) {
            _clear(data);
            return;
        }

        if (data.delay) {
            
            delayTimeout = setTimeout(function () { _xhr(data); }, data.delay);
        } else {
            _xhr(data);
        }
    }

    
    function _xhr(data) {
        if (typeof data.source === 'object') {
            _clear(data);

            
            var search = _search(data.query, _clone(data.source), data);

            if (search.length) {
                _response(search, data);
            }
        } else {
            if (data.jqxhr) {
                data.jqxhr.abort();
            }

            var ajaxData = $.extend({
                limit: data.limit,
                query: data.query
            }, data.combine());

            data.jqxhr = $.ajax({
                url:        data.source,
                dataType:   'json',
                data:       ajaxData,
                beforeSend: function (xhr) {
                    data.$seedUIS.addClass('seedUIS-ajax');
                    _clear(data);

                    if (data.cache) {
                        var stored = _getCache(this.url);

                        if (stored) {
                            xhr.abort();
                            _response(stored, data);
                        }
                    }
                }
            })
            .done(function (response) {
                
                if (data.offset) {
                    response = _grab(response, data.offset);
                }
                if (data.cache) {
                    _setCache(this.url, response);
                }

                _response(response, data);
            })
            .always(function () {
                data.$seedUIS.removeClass('seedUIS-ajax');
            });
        }
    }

    
    function _clear(data) {
        
        data.response = null;
        data.$list = null;
        data.$selected = null;
        data.index = 0;
        data.$seedUIS.find('.seedUIS-list').empty();
        data.$seedUIS.find('.seedUIS-hint').removeClass('seedUIS-hint-show').empty();
        data.hintText = false;

        _close(null, data);
    }

    
    function _response(response, data) {
        _buildList(response, data);

        if (data.$seedUIS.hasClass('seedUIS-focus')) {
            _open(null, data);
        }
    }

    
    function _buildList(list, data) {
        var menu = '';
        var path = './images/logos/'

        for (var item = 0, count = list.length; item < count; item++) {
            var classes = ['seedUIS-item'],
                highlightReg = new RegExp(data.query, 'gi');

            if (data.selectFirst && item === 0 && !data.changeWhenSelect) {
                classes.push('seedUIS-item-selected');
            }

            var label = (data.customLabel && list[item][data.customLabel]) ? list[item][data.customLabel] : list[item].label,
                clear = label;

            label = data.highlightMatches ? label.replace(highlightReg, '<strong>$&</strong>') : label;

            var value = (data.customValue && list[item][data.customValue]) ? list[item][data.customValue] : list[item].value;

            var site_name = list[item].site_name;
            var site_url = list[item].site_url;
            var site_img = path + list[item].site_img;
            var color = 'rgb' + list[item].rgb;
            
            if (data.template) {
                var template = data.template.replace(/({{ label }})/gi, label);

                for (var property in list[item]) {
                    if (list[item].hasOwnProperty(property)) {
                        var regex = new RegExp('{{ ' + property + ' }}', 'gi');

                        template = template.replace(regex, list[item][property]);
                    }
                }

                label = template;
            }

            if (value) {
                
                menu += '<li data-value="' + site_name + '" data-label="' + site_name + '" class="' + classes.join(' ') + '" style="color:' + color + ' !important;" data-url="' + site_url + '"><p class="site_name">' + site_name + '</p><img class="site_img" src="' + site_img + '"></li>';
            } else {
                
                menu += '<li data-label="' + site_name + '" class="' + classes.join(' ') + '" style="color:' + color + ' !important;" data-url="' + site_url + '"><p class="site_name">' + site_name + '</p><img class="site_img" src="' + site_img + '"></li>';
            }
        }

        
        if (list.length && data.hint) {
            var hint = ( list[0].label.substr(0, data.query.length).toUpperCase() === data.query.toUpperCase() ) ? list[0].label : false;

            if (hint && (data.query !== list[0].label)) {
                var hintReg = new RegExp(data.query, 'i');
                var hintText = hint.replace(hintReg, '<span>' + data.query + '</span>');

                data.$seedUIS.find('.seedUIS-hint').addClass('seedUIS-hint-show').html(hintText);
                data.hintText = hintText;
            }
        }

        
        data.response = list;
        data.$seedUIS.find('.seedUIS-list').html(menu);
        data.$selected = (data.$seedUIS.find('.seedUIS-item-selected').length) ? data.$seedUIS.find('.seedUIS-item-selected') : null;
        data.$list = (list.length) ? data.$seedUIS.find('.seedUIS-item') : null;
        data.index = data.$selected ? data.$list.index(data.$selected) : -1;
        data.$seedUIS.find('.seedUIS-item').each(function (i, j) {
            $(j).data(data.response[i]);
        });
    }

    
    function _onKeyup(e) {
        var data = e.data,
            code = e.keyCode ? e.keyCode : e.which;

        if ( (code === 40 || code === 38) && data.$seedUIS.hasClass('seedUIS-show') ) {
            
            var len = data.$list.length,
                next,
                prev;

            if (len) {
                
                if (len > 1) {
                    if (data.index === len - 1) {
                        next = data.changeWhenSelect ? -1 : 0;
                        prev = data.index - 1;
                    } else if (data.index === 0) {
                        next = data.index + 1;
                        prev = data.changeWhenSelect ? -1 : len - 1;
                    } else if (data.index === -1) {
                        next = 0;
                        prev = len - 1;
                    } else {
                        next = data.index + 1;
                        prev = data.index - 1;
                    }
                } else if (data.index === -1) {
                    next = 0;
                    prev = 0;
                } else {
                    prev = -1;
                    next = -1;
                }

                data.index = (code === 40) ? next : prev;

                
                data.$list.removeClass('seedUIS-item-selected');

                if (data.index !== -1) {
                    data.$list.eq(data.index).addClass('seedUIS-item-selected');
                }

                data.$selected = data.$seedUIS.find('.seedUIS-item-selected').length ? data.$seedUIS.find('.seedUIS-item-selected') : null;

                if (data.changeWhenSelect) {
                    _setValue(data);
                }
            }
        } else if ($.inArray(code, ignoredKeyCode) === -1 && $.inArray(code, data.ignoredKeyCode) === -1) {
            
            _launch(data);
        }
    }

    
    function _onKeydown(e) {
        var data = e.data,
            code = e.keyCode ? e.keyCode : e.which;

        if (code === 40 || code === 38 ) {
            e.preventDefault();
            e.stopPropagation();
        } else if (code === 39) {
            
            if (data.hint && data.hintText && data.$seedUIS.find('.seedUIS-hint').hasClass('seedUIS-hint-show')) {
                e.preventDefault();
                e.stopPropagation();

                var hintOrigin = data.$seedUIS.find('.seedUIS-item').length ? data.$seedUIS.find('.seedUIS-item').eq(0).attr('data-label') : false;

                if (hintOrigin) {
                    data.query = hintOrigin;
                    _setHint(data);
                }
            }
        } else if (code === 13) {
            if (data.$seedUIS.hasClass('seedUIS-show') && data.$selected) {
                _select(e);
            } else if (data.$node.attr('data-url')) {
                window.open(data.$node.attr('data-url'));
                // data.$node.removeAttr('data-url').val('');
            } else if (data.$node.length > 0 && !data.$node.attr('data-url') && $('.seedUIS').hasClass('seedUIS-closed')) {
                window.open('https://www.baidu.com/s?ie=utf-8&wd=' + data.$node.val());
                // data.$node.val('');
            }
        }
    }

    
    function _onFocus(e, internal) {
        if (!internal) {
            var data = e.data;

            data.$seedUIS.addClass('seedUIS-focus');

            if (!data.$node.prop('disabled') && !data.$seedUIS.hasClass('seedUIS-show')) {
                if (data.focusOpen) {
                    _launch(data);
                    data.focused = true;

                    setTimeout(function () {
                        data.focused = false;
                    }, 500);
                }
            }
        }
    }

    
    function _onBlur(e, internal) {
        e.preventDefault();
        e.stopPropagation();

        var data = e.data;

        if (!internal) {
            data.$seedUIS.removeClass('seedUIS-focus');
            _close(e);
        }
    }

    
    function _onMousedown(e) {
        
        if (e.type === 'mousedown' && $.inArray(e.which, [2, 3]) !== -1) { return; }

        var data = e.data;

        if (data.$list && !data.focused) {
            if (!data.$node.is(':disabled')) {
                if (isMobile && !isFirefoxMobile) {
                    var el = data.$select[0];

                    if (window.document.createEvent) { 
                        var evt = window.document.createEvent('MouseEvents');
                        evt.initMouseEvent('mousedown', false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        el.dispatchEvent(evt);
                    } else if (el.fireEvent) { 
                        el.fireEvent('onmousedown');
                    }
                } else {
                    
                    if (data.$seedUIS.hasClass('seedUIS-closed')) {
                        _open(e);
                    } else if (data.$seedUIS.hasClass('seedUIS-show')) {
                        _close(e);
                    }
                }
            }
        }
    }

    
    function _open(e, instanceData) {
        var data = e ? e.data : instanceData;

        if (!data.$node.prop('disabled') && !data.$seedUIS.hasClass('seedUIS-show') && data.$list && data.$list.length) {
            data.$seedUIS.removeClass('seedUIS-closed').addClass('seedUIS-show');
            $body.on('click.seedUIS-' + data.guid, ':not(.seedUIS-item)', data, _closeHelper);
        }
    }

    
    function _closeHelper(e) {
        if ( $(e.target).hasClass('seedUIS-node') ) {
            return;
        }

        if ($(e.currentTarget).parents('.seedUIS').length === 0) {
            _close(e);
        }
    }

    
    function _close(e, instanceData) {
        var data = e ? e.data : instanceData;

        if (data.$seedUIS.hasClass('seedUIS-show')) {
            data.$seedUIS.removeClass('seedUIS-show').addClass('seedUIS-closed');
            $body.off('.seedUIS-' + data.guid);
        }
    }

    
    function _select(e) {
        
        if (e.type === 'mousedown' && $.inArray(e.which, [2, 3]) !== -1) {
            return;
        }

        var data = e.data;

        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'mousedown' && $(this).length) {
            data.$selected = $(this);
            data.index = data.$list.index(data.$selected);
        }

        if (!data.$node.prop('disabled')) {
            _close(e);
            _update(data);

            if (e.type === 'click') {
                data.$node.trigger('focus', [ true ]);
                console.log('node' + data.$node);
                console.log('selected' + data.$selected);
            } else if (e.type === 'keydown') {
                if (data.$node.attr('data-url')) {
                    
                    
                } else {
                    
                }
            }
        }
    }

    
    function _setHint(data) {
        _setValue(data);
        _handleChange(data);
        _launch(data);
    }

    
    function _setValue(data) {
        if (data.$selected) {
            if (data.hintText && data.$seedUIS.find('.seedUIS-hint').hasClass('seedUIS-hint-show')) {
                data.$seedUIS.find('.seedUIS-hint').removeClass('seedUIS-hint-show');
            }

            data.$node.val(data.$selected.attr('data-value') ? data.$selected.attr('data-value') : data.$selected.attr('data-label'));
            data.$node.attr('data-url',data.$selected.attr('data-url'));
        } else {
            if (data.hintText && !data.$seedUIS.find('.seedUIS-hint').hasClass('seedUIS-hint-show')) {
                data.$seedUIS.find('.seedUIS-hint').addClass('seedUIS-hint-show');
            }

            data.$node.val(data.query);
            data.$node.removeAttr('data-url');
        }
    }

    
    function _update(data) {
        _setValue(data);
        _handleChange(data);
        _clear(data);
    }

    
    function _handleChange(data) {
        data.callback.call(data.$seedUIS, data.$node.val(), data.index, data.response[data.index]);
        data.$node.trigger('change');
    }

    
    function _grab(response, offset) {
        offset = offset.split('.');

        while (response && offset.length) {
            response = response[offset.shift()];
        }

        return response;
    }

    
    function _setCache(url, data) {
        if (!supportLocalStorage) {
            return;
        }

        if (url && data) {
            cache[url] = {
                value: data
            };

            
            try {
                localStorage.setItem(localStorageKey, JSON.stringify(cache));
            } catch (e) {
                var code = e.code || e.number || e.message;

                if (code === 22) {
                    _deleteCache();
                } else {
                    throw(e);
                }
            }
        }
    }

    
    function _getCache(url) {
        if (!url) {
            return;
        }

        var response = (cache[url] && cache[url].value) ? cache[url].value : false;

        return response;
    }

    
    function _loadCache() {
        if (!supportLocalStorage) {
            return;
        }

        return JSON.parse(localStorage.getItem(localStorageKey) || '{}');
    }

    
    function _deleteCache() {
        try {
            localStorage.removeItem(localStorageKey);
            cache = _loadCache();
        } catch (e) {
            throw(e);
        }
    }

    
    function _clone(obj) {
        var copy;

        if (null === obj || 'object' !== typeof obj) {
            return obj;
        }

        copy = obj.constructor();

        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }

        return copy;
    }

    
    var cache = _loadCache();

    $.fn.seedUIS = function (method) {
        if (publics[method]) {
            return publics[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return _init.apply(this, arguments);
        }
        return this;
    };

    $.seedUIS = function (method) {
        if (method === 'defaults') {
            publics.defaults.apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (method === 'clearCache') {
            publics.clearCache.apply(this, null);
        }
    };
})(jQuery, window);


(function(basePath, w) {
    function resize() {
    	var deviceWidth = document.documentElement.clientWidth;  
        if(deviceWidth > 640) deviceWidth = 640;  
        document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';  
        $('.hero').css({'height':$(window).height() + 'px'});
        setTimeout(function(){
            $('.hero-globe').css({'transform':'scale(' + $(window).height()/950 + ')'});
        }, 1e3);
    };

    function event() {
    	var $s_input = $('#sb_form_q');
    	var $s_enter = $('#sb_form_go');

    	$s_enter.click(function(e){
	        e.preventDefault();
	        if ($s_input.attr('data-url')) {
	        	$s_input.removeAttr('data-url');
                window.open($s_input.attr('data-url'));
	        } else if ($s_input.length > 0 && !$s_input.attr('data-url') && $('.seedUIS').hasClass('seedUIS-closed')) {
                window.open('https://www.baidu.com/s?ie=utf-8&wd=' + $s_input.val());
                $s_input.val('');
            }
    	});

    	$('.seedUIS-list').delegate('li', 'click', function(){
    		alert();
    		$(this).addClass('.seedUIS-item-selected');
    		$s_input.attr('data-url', $(this).attr('data-url'));
    	});
    };

    function nav_init() {
    	event();
	    resize();
	    $(window).resize(function(){
	        resize();
	    });
    };
    nav_init();
})("http://www.seedui.com", window);