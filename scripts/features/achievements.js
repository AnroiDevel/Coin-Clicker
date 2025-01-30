import { GameState } from '../core/game-state.js'
import { EventBus } from '../core/event-bus.js'

export const Achievements = {
	init() {
		this.setupToggle()
		this.loadAchievements()
		EventBus.addEventListener('scoreUpdated', () => this.check())
		EventBus.addEventListener('achievementUnlocked', e =>
			this.showAchievementPopup(e.detail)
		)
	},

	setupToggle() {
		const toggleButton = document.querySelector('.toggle-btn')
		const list = document.querySelector('.achievements-list')

		if (!toggleButton || !list) {
			console.error('❌ Кнопка или список достижений не найдены!')
			return
		}

		toggleButton.addEventListener('click', () => {
			if (list.style.maxHeight === '0px' || !list.style.maxHeight) {
				list.style.maxHeight = list.scrollHeight + 'px'
			} else {
				list.style.maxHeight = '0px'
			}

			console.log('🎯 Новый max-height:', list.style.maxHeight)
		})
	},

	loadAchievements() {
		const list = document.querySelector('.achievements-list')
		if (!list) {
			console.error('❌ achievements-list не найден!')
			return
		}

		list.innerHTML = '' // Очищаем перед загрузкой

		Object.entries(GameState.state.achievements).forEach(
			([key, achievement]) => {
				console.log(`🎖 Загружаем достижение: ${achievement.title}`)
				const item = document.createElement('div')
				item.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`
				item.innerHTML = `
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <span class="status">${
									achievement.unlocked ? '✅ Получено' : '🔒 Закрыто'
								}</span>
            `
				list.appendChild(item)
			}
		)

		console.log('🏆 Достижения загружены')
	},

	check() {
		Object.entries(GameState.state.achievements).forEach(
			([key, achievement]) => {
				if (!achievement.unlocked && this.meetsCondition(key)) {
					achievement.unlocked = true
					GameState.save()
					EventBus.dispatchEvent(
						new CustomEvent('achievementUnlocked', {
							detail: achievement.title,
						})
					)
				}
			}
		)

		this.loadAchievements() // Обновляем UI
	},

	meetsCondition(achievementKey) {
		switch (achievementKey) {
			case 'novice':
				return GameState.state.score >= 100
			case 'investor':
				return GameState.state.upgrades.autoclicker.count >= 1
			case 'master':
				return GameState.state.score >= 500
			default:
				return false
		}
	},

	showAchievementPopup(title) {
		const popup = document.createElement('div')
		popup.className = 'achievement-popup'
		popup.textContent = `🏆 Новое достижение: ${title}`

		document.body.appendChild(popup)
		setTimeout(() => popup.classList.add('fade-out'), 2000)
		setTimeout(() => popup.remove(), 2500)
	},
}
