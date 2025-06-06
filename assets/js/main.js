const cardsContainer = document.querySelector('.cards-container')
const cards = cardsContainer.querySelectorAll('.special-offer-card')

cards.forEach(card => {
	const image = card.querySelector('.image-placeholder img')
	const imageContainer = card.querySelector('.image-container')

	card.addEventListener('mousemove', e => {
		const rect = imageContainer.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2

		const mouseX = e.clientX
		const mouseY = e.clientY

		const deltaX = ((mouseX - centerX) / rect.width) * 8
		const deltaY = ((mouseY - centerY) / rect.height) * 8

		const moveX = -deltaX
		const moveY = -deltaY

		image.style.transform = `translate(${moveX}px, ${moveY}px)`
	})

	card.addEventListener('mouseleave', () => {
		image.style.transform = 'translate(0, 0)'
	})
})
const bleach = document.querySelector('.from-bleach')
const img = document.querySelector('.from-bleach-card img')

img.addEventListener('mouseenter', () => {
	bleach.classList.add('bleach-active')
})

img.addEventListener('mouseleave', () => {
	bleach.classList.remove('bleach-active')
})
