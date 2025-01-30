export const Achievements = {
	init() {
		this.setupToggle()
		this.loadAchievements()
	},

	setupToggle() {
		document
			.querySelector('.achievements-header')
			.addEventListener('click', () => {
				const list = document.querySelector('.achievements-list')
				list.classList.toggle('visible')
			})
	},

	loadAchievements() {
		// Логика загрузки достижений
	},

	check() {
		// Логика проверки достижений
	},
}
