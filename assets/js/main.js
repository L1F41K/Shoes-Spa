;(function ($) {
	var $dragMe = $('.dragme'),
		$container = $('.sl-container'),
		$viewAfter = $('.view-after')
	$dragMe.draggable({
		containment: 'parent',
		drag: function () {
			$viewAfter.css({
				width: parseFloat($(this).css('left')) + 5,
			})
		},
	})
	$container.on('click', function (event) {
		var eventLeft = event.pageX - $container.offset().left - 15
		animateTo(eventLeft)
	})
	animateTo('50%')
	function animateTo(_left) {
		$dragMe.animate(
			{
				left: _left,
			},
			'slow',
			'linear'
		)
		$viewAfter.animate(
			{
				width: _left,
			},
			'slow',
			'linear'
		)
	}
})(jQuery)
document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.header')
	const scrollThreshold = 100
	const headerHeight = header.offsetHeight

	window.addEventListener('scroll', function () {
		if (window.scrollY > scrollThreshold) {
			header.classList.add('sticky')
			document.body.classList.add('sticky-header-padding')
		} else {
			header.classList.remove('sticky')
			document.body.classList.remove('sticky-header-padding')
		}
	})
})
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault() // Предотвращаем стандартное поведение перехода по ссылке
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
		})
	})
})
