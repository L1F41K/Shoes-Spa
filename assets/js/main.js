;(function ($) {
	var $dragMe = $('.dragme'),
		$container = $('.sl-container'),
		$viewAfter = $('.view-after'),
		isDragging = false

	// Инициализация draggable для десктопов
	$dragMe.draggable({
		containment: 'parent',
		drag: function (event, ui) {
			updateView(ui.position.left)
		},
	})

	// Обработчики для touch-устройств
	$dragMe.on('touchstart', function (e) {
		isDragging = true
		e.preventDefault() // Предотвращаем скролл страницы
	})

	$(document).on('touchmove', function (e) {
		if (!isDragging) return

		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
			containerOffset = $container.offset(),
			touchX = touch.pageX - containerOffset.left,
			dragMeWidth = $dragMe.outerWidth(),
			maxLeft = $container.width() - dragMeWidth

		// Ограничиваем положение в пределах контейнера
		touchX = Math.max(0, Math.min(touchX - dragMeWidth / 2, maxLeft))

		$dragMe.css('left', touchX)
		updateView(touchX)

		e.preventDefault() // Предотвращаем скролл страницы
	})

	$(document).on('touchend', function () {
		isDragging = false
	})

	// Обработчик клика/тапа по контейнеру
	$container.on('click touchstart', function (event) {
		var eventLeft

		if (event.type === 'touchstart') {
			var touch =
				event.originalEvent.touches[0] || event.originalEvent.changedTouches[0]
			eventLeft =
				touch.pageX - $container.offset().left - $dragMe.outerWidth() / 2
		} else {
			eventLeft =
				event.pageX - $container.offset().left - $dragMe.outerWidth() / 2
		}

		// Ограничиваем положение в пределах контейнера
		var maxLeft = $container.width() - $dragMe.outerWidth()
		eventLeft = Math.max(0, Math.min(eventLeft, maxLeft))

		animateTo(eventLeft)
	})

	// Функция обновления вида
	function updateView(leftPosition) {
		$viewAfter.css({
			width: leftPosition + $dragMe.outerWidth() / 2,
		})
	}

	// Функция анимации
	function animateTo(_left) {
		$dragMe.stop(true).animate(
			{
				left: _left,
			},
			{
				duration: 300,
				easing: 'linear',
				step: function () {
					updateView($(this).position().left)
				},
			}
		)
	}

	// Инициализация начального положения
	animateTo($container.width() * 0.5)
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
