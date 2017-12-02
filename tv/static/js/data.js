/**
 * #api使用手册
 *
 * 请求方式统一为post
 * 分类为顶级类目，视屏下需要有颜色的标记
 * 
 * 请求内容为json格式内容统一如下
 * {
 *     "type": "json", //设置返回的数据格式,可选值为jsonp
 *     "token": "token", //管理员分配
 *     "params": {
 *     }
 * }
 *
 * 返回格式目前为json格式统一如下
 * {
 *     "error": 0, //代表没有错误
 *     "data": {} //具体内容
 * }
 */


// A推荐模块
// 该模块位于首页，使用户最先看到的部分。

/** 
 * A1 每日新鲜主题
 * 获取每日的新鲜主题信息列表跟基础信息。
 */
var adviceFreshtopics =  {
	"error": 0,
	"data": [
		{
			"id": 1,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg",
			"color":"#ffffff"
		},
		{
			"id": 2,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg",
			"color":"#ffffff"
		}
	]
};

/** 
 * A2 每日精选内容
 * 获取每日精选内容。
 */
var adviceTopics = {
	"error": 0,
	"data": [
		{
			"id": 1,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/这是一个图标.jpg",
			"desc": "这是简介",
			"clolor": "#ffff",
			"firstmovie": {
				"id": "1",
				"name": "abc",
				"avater": "视屏首页截屏.png"
			}
		},
		{
			"id": 2,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/这是一个图标.jpg",
			"desc": "这是简介",
			"clolor": "#ffff",
			"firstmovie": {
				"id": "1",
				"name": "abc",
				"avater": "视屏首页截屏.png"
			}
		}
	]
};

// B订阅模块

/** 
 * B1 订阅主题
 * 根据虚拟用户Id获取该用户的订阅的主题。
 */
var subscribeTopics = {
	"error": 0,
	"data": [
		{
			"id": 1,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg"
		},
		{
			"id": 2,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg"
		}
	]
};

// C基础信息模块

/** 
 * C1 获取系统中的所有类目
 */
var series = {
	"error": 0,
	"data": [
		{
			"id": 1,
			"name": "游戏",
			"color": "#ffffff"
		},
		{
			"id": 2,
			"name": "游戏",
			"color": "#ffffff"
		}
	]
};

/** 
 * C2 获取类目下的主题列表
 */
var seriesTopics = {
	"error": 0,
	"data": [
		{
			"id": 1,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg",
			"color": "#ffff"
		},
		{
			"id": 2,
			"name": "每日大法好",
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg",
			"color": "#ffff"
		}
	]
};

/** 
 * C3 获取主题下的视频列表
 */
var topicsMovies = {
	"error": 0,
	"data": [
		{
			"id": 1,//唯一id
			"name": "每日大法好",//名称
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg",
		},
		{
			"id": 2,//唯一id
			"name": "每日大法好",//名称
			"avater": "http://tv.libooc.com/avater/topic/xxx.jpg",
		}
	]
};

// D视频模块

/** 
 * D1 具体的视频信息
 */
var videosDetail = {
	"error": 0,
	"data": [
		{
		"id": 1,//唯一id
		"name": "每日大法好",//名称
		"avater": "http://tv.libooc.com/avater/topic/xxx.jpg",
		"source": {
				"cq": '',//高清:""
				"gq": '',//超清:""
				"bq": ''//标清:""
			}
		}
	]
};