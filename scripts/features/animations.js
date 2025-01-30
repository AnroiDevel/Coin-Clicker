import { GameState } from '../core/game-state.js'

export const Animations = {
	init() {
		this.setupCoinAnimation()
	},

	setupCoinAnimation() {
		const coin = document.getElementById('coin')
		coin.addEventListener('click', e => this.playCoinClick(e))
	},

	playCoinClick() {
		const multiplier =
			GameState.state.upgrades.multiplier.count > 0
				? Math.pow(2, GameState.state.upgrades.multiplier.count)
				: 1
		// Основная анимация
		coin.classList.add('coin-shrink')
		setTimeout(() => coin.classList.remove('coin-shrink'), 100)

		// Дополнительные эффекты
		this.createFloatingText(`+${multiplier}`, coin.parentElement)
	},

	createFloatingText(text, parent) {
		const element = document.createElement('div')
		element.className = 'floating-text'
		element.textContent = text
		parent.appendChild(element)
		setTimeout(() => element.remove(), 500)
	},

	playPurchaseEffect(type) {
		const button = document.querySelector(`[data-upgrade="${type}"]`)
		if (button) {
			button.classList.add('purchase-effect')
			setTimeout(() => button.classList.remove('purchase-effect'), 500)
		}
	},

	playErrorEffect(type) {
		const button = document.querySelector(`[data-upgrade="${type}"]`)
		if (button) {
			button.classList.add('error-shake')
			setTimeout(() => button.classList.remove('error-shake'), 500)
		}
	},
}
