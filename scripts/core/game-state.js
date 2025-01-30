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
	},

	init() {
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
	},

	getMultiplier() {
		return this.state.upgrades.multiplier.count > 0
			? Math.pow(2, this.state.upgrades.multiplier.count)
			: 1
	},

	save() {
		localStorage.setItem('coinClickerSave', JSON.stringify(this.state))
	},

	load() {
		const saved = localStorage.getItem('coinClickerSave')
		if (!saved) return

		try {
			const loaded = JSON.parse(saved)
			this.state = {
				...this.state,
				...loaded,
				upgrades: this.mergeState(this.state.upgrades, loaded.upgrades),
				achievements: this.mergeState(
					this.state.achievements,
					loaded.achievements
				),
			}
		} catch (error) {
			console.error('Ошибка загрузки:', error)
		}
	},

	mergeState(base, loaded) {
		return Object.fromEntries(
			Object.entries(base).map(([key, val]) => [
				key,
				{ ...val, ...(loaded?.[key] || {}) },
			])
		)
	},
}
