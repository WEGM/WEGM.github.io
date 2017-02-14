/**
 * Crayola colors in JSON format
 * from: https://gist.github.com/jjdelc/1868136
 */
var colors =
[
    {
        "hex": "#FFF",
        "label": "颜色 配色 调色 CMYK值 RGB值 传统色 中国色 中国色 － 中国传统颜色",
        "rgb": "(255, 255, 255)",
        "site_name": "中国色 － 中国传统颜色",
        "site_url": "http://zhongguose.com/",
        "site_img": "zgz.png"
    },
    {
        "hex": "#FFF",
        "label": "CDN加速 免费 开源 托管 Bootstrap中文网开源项目免费 CDN 服务",
        "rgb": "(255, 255, 255)",
        "site_name": "Bootstrap中文网开源项目免费 CDN 服务",
        "site_url": "http://www.bootcdn.cn/",
        "site_img": "cdn.png"
    },
    {
        "hex": "#FFF",
        "label": "阿里巴巴 矢量 图标 字库 font icon Iconfont Iconfont-阿里巴巴矢量图标库",
        "rgb": "(255, 255, 255)",
        "site_name": "Iconfont-阿里巴巴矢量图标库",
        "site_url": "http://www.iconfont.cn/",
        "site_img": "iconfont.png"
    },
];

$(function () {
  $('#sb_form_q').autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,

        // object to local or url to remote search
        source: colors,

        // custom template
        template: '{{ label }} <span>({{ hex }})</span>',

        // show hint
        hint: true,

        // abort source if empty field
        empty: false,

        // max results
        limit: 10,

        callback: function (value, index, selected) {
            if (selected) {
                // $('.icon').css('background-color', selected.hex);
            }
        }
    });
});