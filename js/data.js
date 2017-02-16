var data =
[
    {
        "label": "颜色 配色 调色 CMYK值 RGB值 传统色 中国色 中国色 － 中国传统颜色",
        "rgb": "(255, 255, 255)",
        "site_name": "中国色 － 中国传统颜色",
        "site_des": "提供各种中国的传统颜色的名称，CMYK值，RGB值，16进制表示。",
        "site_url": "http://zhongguose.com/",
        "site_img": "zgz.png"
    },
    {
        "label": "CDN加速 免费 开源 托管 Bootstrap中文网开源项目免费 CDN 服务",
        "rgb": "(255, 255, 255)",
        "site_name": "Bootstrap中文网开源项目免费 CDN 服务",
        "site_des": "我们致力于为Bootstrap一样优秀的开源项目提供稳定、快速的免费 CDN 服务",
        "site_url": "http://www.bootcdn.cn/",
        "site_img": "cdn.png"
    },
    {
        "label": "阿里巴巴 矢量 图标 字库 font icon Iconfont Iconfont-阿里巴巴矢量图标库",
        "rgb": "(255, 255, 255)",
        "site_name": "Iconfont-阿里巴巴矢量图标库",
        "site_des": "Iconfont-国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造，设计和前端开发的便捷工具",
        "site_url": "http://www.iconfont.cn/",
        "site_img": "iconfont.png"
    },
    {
        "label": "七牛 云 云存储 对象存储 直播云 融合 CDN 加速",
        "rgb": "(255, 255, 255)",
        "site_name": "七牛云",
        "site_des": "七牛云是国内领先的企业级云服务商，致力于打造以数据为核心的场景化 PaaS 服务。围绕富媒体场景，七牛先后推出了对象存储，融合 CDN 加速，直播云服务，内容反垃圾等服务。",
        "site_url": "http://www.qiniu.com/",
        "site_img": "qiniu.png"
    },
    {
        "label": "智图 图片压缩 图片格式转换 jpg压缩 png压缩 webP生成 jpg png webP 压缩 图片 图片大小 图片在线压缩 图片在线转换格式 网站图片优化 图片在线优化",
        "rgb": "(255, 255, 255)",
        "site_name": "智图—图片智能自动优化平台",
        "site_des": "智图为图片智能选择合适的图片格式,支持在线jpg图片压缩,png图片压缩,并支持ps改变图片品质；在线生成webP图片,为你压缩图片以便节省带宽优化体验,为你提供WebP图片让你的站点高大上。",
        "site_url": "https://zhitu.isux.us/",
        "site_img": "zhitu.png"
    },
];

$(function () {
  $('#sb_form_q').seedUIS({
        highlightMatches: true,
        source: data,
        template: '{{ label }}',
        hint: false,
        empty: false,
        limit: 100,
        callback: function (value, index, selected) {
            if (selected) {
                window.open(selected.site_url);
            } else {
                var $s_input = $('#sb_form_q');
                var $s_enter = $('#sb_form_go');
                if ($s_input.attr('data-url')) {
                    window.open($s_input.attr('data-url'));
                    $s_input.removeAttr('data-url');
                } else if ($s_input.length > 0 && $s_input.attr('data-url')) {
                    window.open('https://www.baidu.com/s?ie=utf-8&wd=' + $s_input.val());
                    $s_input.val('');
                }
            }
        }
    });
});