import { EventBus } from '../core/event-bus.js'

export const GameState = {
	state: {
		score: 0,
		upgrades: {
			autoclicker: { count: 0, basePrice: 50, currentPrice: 50 },
			multiplier: {
				count: 0,
				basePrice: 100,
				currentPrice: 100,
				multiplier: 2,
			},
		},
		achievements: {
			novice: {
				unlocked: false,
				title: 'Новичок',
				description: 'Сделать 100 кликов',
			},
			investor: {
				unlocked: false,
				title: 'Инвестор',
				description: 'Купить первое улучшение',
			},
			master: {
				unlocked: false,
				title: 'Мастер кликов',
				description: 'Сделать 500 кликов',
			},
		},
	},

	init() {
		this.load()
		console.log('Игра загружена:', this.state)
	},

	getMultiplier() {
		return this.state.upgrades.multiplier.count > 0
			? Math.pow(2, this.state.upgrades.multiplier.count)
			: 1
	},

	updateScore(amount) {
		this.state.score += amount
		console.log(`Очки обновлены: ${this.state.score}`)
		this.save()
		EventBus.dispatchEvent(
			new CustomEvent('scoreUpdated', { detail: this.state.score })
		)
	},

	save() {
		try {
			localStorage.setItem('coinClickerSave', JSON.stringify(this.state))
		} catch (error) {
			console.error('Ошибка сохранения в localStorage:', error)
		}
	},

	load() {
		try {
			const saved = localStorage.getItem('coinClickerSave')
			if (saved) {
				this.state = JSON.parse(saved)
				console.log('🔄 Данные загружены:', this.state)
			}
		} catch (error) {
			console.error('Ошибка загрузки из localStorage:', error)
		}
		EventBus.dispatchEvent(
			new CustomEvent('scoreUpdated', { detail: this.state.score })
		)
	},

	reset() {
		console.log('🔄 Сброс прогресса...')
		this.state = {
			score: 0,
			upgrades: {
				autoclicker: { count: 0, basePrice: 50, currentPrice: 50 },
				multiplier: {
					count: 0,
					basePrice: 100,
					currentPrice: 100,
					multiplier: 2,
				},
			},
			achievements: {
				novice: {
					unlocked: false,
					title: 'Новичок',
					description: 'Сделать 100 кликов',
					reward: 50,
				},
				investor: {
					unlocked: false,
					title: 'Инвестор',
					description: 'Купить первое улучшение',
					reward: 100,
				},
				master: {
					unlocked: false,
					title: 'Мастер кликов',
					description: 'Сделать 500 кликов',
					reward: 200,
				},
			},
		}

		this.save()
		EventBus.dispatchEvent(new Event('resetProgress'))
	},
}
