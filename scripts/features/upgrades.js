import { GameState } from '../core/game-state.js'
import { EventBus } from '../core/event-bus.js'

export const Upgrades = {
	init() {
		this.setupEventListeners()
		this.updateButtons()
		EventBus.addEventListener('scoreUpdated', () => this.updateButtons())
		if (GameState.state.upgrades.autoclicker.count > 0) {
			this.startAutoClicker()
		}
	},

	setupEventListeners() {
		document.querySelectorAll('.upgrade-btn').forEach(button => {
			button.addEventListener('click', () =>
				this.purchaseUpgrade(button.dataset.upgrade)
			)
		})
	},

	purchaseUpgrade(upgradeType) {
		const upgrade = GameState.state.upgrades[upgradeType]
		if (!upgrade) {
			console.error(`❌ Ошибка: улучшение "${upgradeType}" не найдено`)
			return
		}

		if (GameState.state.score >= upgrade.currentPrice) {
			GameState.state.score -= upgrade.currentPrice
			upgrade.count++
			upgrade.currentPrice = Math.floor(
				upgrade.basePrice * Math.pow(1.15, upgrade.count)
			)

			GameState.save()
			EventBus.dispatchEvent(
				new CustomEvent('scoreUpdated', { detail: GameState.state.score })
			)

			console.log(
				`✅ Куплено улучшение: ${upgradeType}, теперь их ${upgrade.count}`
			)

			if (upgradeType === 'autoclicker') {
				Upgrades.startAutoClicker()
			}
		} else {
			console.warn(`❌ Недостаточно средств для покупки ${upgradeType}`)
		}
	},

	updateButtons() {
		console.log('🔄 Обновление кнопок магазина...')
		document.querySelectorAll('.upgrade-btn').forEach(button => {
			const upgradeType = button.dataset.upgrade
			const upgrade = GameState.state.upgrades[upgradeType]

			if (!upgrade) return

			button.querySelector('.price').textContent = upgrade.currentPrice
			button.querySelector('.count').textContent = upgrade.count

			if (GameState.state.score >= upgrade.currentPrice) {
				button.classList.remove('disabled')
			} else {
				button.classList.add('disabled')
			}
		})
	},

	startAutoClicker() {
		if (this.autoClickerInterval) {
			clearInterval(this.autoClickerInterval)
		}

		this.autoClickerInterval = setInterval(() => {
			if (GameState.state.upgrades.autoclicker.count > 0) {
				console.log(
					`🤖 Автоклик! Количество: ${GameState.state.upgrades.autoclicker.count}`
				)
				GameState.updateScore(GameState.state.upgrades.autoclicker.count)
			}
		}, 1000)
	},
}
