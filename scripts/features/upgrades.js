import { GameState } from '../core/game-state.js'
import { EventBus } from '../core/event-bus.js'

export const Upgrades = {
	init() {
		this.updateButtons()
		EventBus.addEventListener('updateShop', () => this.updateButtons())
	},

	updateButtons() {
		document.querySelectorAll('.upgrade-btn').forEach(button => {
			const upgrade = button.dataset.upgrade
			const price = GameState.state.upgrades[upgrade].currentPrice
			if (GameState.state.score >= price) {
				button.classList.remove('disabled')
			} else {
				button.classList.add('disabled')
			}
		})
	},
}
