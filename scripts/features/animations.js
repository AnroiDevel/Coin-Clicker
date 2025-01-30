import { GameState } from '../core/game-state.js'

export const Animations = {
	init() {
		this.setupCoinAnimation()
	},

	setupCoinAnimation() {
		const coin = document.getElementById('coin')
		if (!coin) {
			console.error('❌ Элемент монеты не найден!')
			return
		}

		coin.addEventListener('click', e => this.playCoinClick(e))
	},

	playCoinClick(event) {
		if (!event || !event.target) {
			console.error('❌ Ошибка: event.target не определен!')
			return
		}

		const coin = event.target
		if (!coin) return

		coin.classList.add('coin-shrink')
		setTimeout(() => coin.classList.remove('coin-shrink'), 100)

		this.createFloatingText(`+${GameState.getMultiplier()}`, coin.parentElement)
	},

	createFloatingText(text, parent) {
		if (!parent) return

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

	playAchievementUnlock(title) {
		const notification = document.createElement('div')
		notification.className = 'achievement-animation'
		notification.textContent = `🏆 Достижение: ${title}`

		document.body.appendChild(notification)
		setTimeout(() => notification.remove(), 3000)
	},
}
