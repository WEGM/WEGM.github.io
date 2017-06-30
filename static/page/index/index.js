
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	slidesPerView: 1,
	paginationClickable: true,
	spaceBetween: 0,
	loop: true
});

var classLists = '';
for (var i = 0; i < 16; i++) classLists += classTpl;
$('.class-lists .lists-content').html(classLists);

var teacherLists = '';
for (var i = 0; i < 10; i++) teacherLists += teacherTpl;
$('.teacher-lists .lists-content').html(teacherLists);

var articleLists = '';
for (var i = 0; i < 10; i++) articleLists += articleTpl;
$('.article-lists .lists-content').html(articleLists);
