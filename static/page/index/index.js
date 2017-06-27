particlesJS('particles-js',
  {
	"particles": {
	  "number": {
		"value": 80,
		"density": {
		  "enable": true,
		  "value_area": 800
		}
	  },
	  "color": {
		"value": "#e3f3ff"
	  },
	  "shape": {
		"type": "circle",
		"stroke": {
		  "width": 0,
		  "color": "#000000"
		},
		"polygon": {
		  "nb_sides": 5
		}
	  },
	  "opacity": {
		"value": 0.5,
		"random": false,
		"anim": {
		  "enable": false,
		  "speed": 1,
		  "opacity_min": 0.1,
		  "sync": false
		}
	  },
	  "size": {
		"value": 5,
		"random": true,
		"anim": {
		  "enable": false,
		  "speed": 40,
		  "size_min": 0.1,
		  "sync": false
		}
	  },
	  "line_linked": {
		"enable": true,
		"distance": 150,
		"color": "#e3f3ff",
		"opacity": 0.4,
		"width": 1
	  },
	  "move": {
		"enable": true,
		"speed": 6,
		"direction": "none",
		"random": false,
		"straight": false,
		"out_mode": "out",
		"attract": {
		  "enable": false,
		  "rotateX": 600,
		  "rotateY": 1200
		}
	  }
	},
	"interactivity": {
	  "detect_on": "canvas",
	  "events": {
		"onhover": {
		  "enable": true,
		  "mode": "repulse"
		},
		"onclick": {
		  "enable": true,
		  "mode": "push"
		},
		"resize": true
	  },
	  "modes": {
		"grab": {
		  "distance": 400,
		  "line_linked": {
			"opacity": 1
		  }
		},
		"bubble": {
		  "distance": 400,
		  "size": 40,
		  "duration": 2,
		  "opacity": 8,
		  "speed": 3
		},
		"repulse": {
		  "distance": 200
		},
		"push": {
		  "particles_nb": 4
		},
		"remove": {
		  "particles_nb": 2
		}
	  }
	},
	"retina_detect": true,
	"config_demo": {
	  "hide_card": false,
	  "background_color": "#FFF",
	  "background_image": "",
	  "background_position": "50% 50%",
	  "background_repeat": "no-repeat",
	  "background_size": "cover"
	}
  }
);
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	slidesPerView: 1,
	paginationClickable: true,
	spaceBetween: 30,
	loop: true
});

var classLists = '';
var classTpl = simpleTpl();
classTpl._('<div class="lists-content-card col-lg-3 col-md-6 col-sm-6 col-xs-6">')
	._('<a target="_blank" class="course-card g-shadow" href="">')
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
for (var i = 0; i < 16; i++) classLists += classTpl;
$('.class-lists .lists-content').html(classLists);

var teacherLists = '';
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
for (var i = 0; i < 10; i++) teacherLists += teacherTpl;
$('.teacher-lists .lists-content').html(teacherLists);