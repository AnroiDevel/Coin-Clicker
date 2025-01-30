import { GameState } from './game-state.js'
import { EventBus } from '../core/event-bus.js'

export const DOM = {
	elements: {},

	init() {
		this.cacheElements()
		this.updateScore(GameState.state.score)
		this.updateUpgrades()
		this.updateAchievements()

		EventBus.addEventListener('resetProgress', () => this.refreshUI())
		EventBus.addEventListener('scoreUpdated', e => this.updateScore(e.detail))
	},

	refreshUI() {
		console.log('🔄 Обновление интерфейса после сброса')
		this.updateScore(0)
		this.updateUpgrades()
		this.updateAchievements()
	},

	cacheElements() {
		this.elements.score = document.getElementById('score')
		this.elements.upgrades = document.querySelectorAll('.upgrade-btn')
		this.elements.achievementsList =
			document.querySelector('.achievements-list')
	},

	updateScore(score) {
		if (this.elements.score) {
			this.elements.score.textContent = score
		}
	},

	updateUpgrades() {
		this.elements.upgrades.forEach(button => {
			const upgradeType = button.dataset.upgrade
			const upgrade = GameState.state.upgrades[upgradeType]

			if (upgrade) {
				button.querySelector('.price').textContent = upgrade.currentPrice
				button.querySelector('.count').textContent = upgrade.count
				button.classList.toggle(
					'disabled',
					GameState.state.score < upgrade.currentPrice
				)
			}
		})
	},

	updateAchievements() {
		if (!this.elements.achievementsList) return

		this.elements.achievementsList.innerHTML = ''
		Object.entries(GameState.state.achievements).forEach(
			([key, achievement]) => {
				const achievementItem = document.createElement('div')
				achievementItem.className = 'achievement'
				achievementItem.innerHTML = `
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <span class="status">${
									achievement.unlocked ? '✅ Получено' : '🔒 Закрыто'
								}</span>
            `
				this.elements.achievementsList.appendChild(achievementItem)
			}
		)
	},

	toggleElement(selector, show) {
		const element = document.querySelector(selector)
		if (element) {
			element.style.display = show ? 'block' : 'none'
		}
	},
}
