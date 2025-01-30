export const DOM = {
	elements: {
		score: null,
		coin: null,
		upgrades: [],
		resetBtn: null,
		achievementsList: null,
	},

	init() {
		this.cacheElements()
		this.setupDynamicStyles()
	},

	cacheElements() {
		this.elements = {
			score: document.getElementById('score'),
			coin: document.getElementById('coin'),
			upgrades: [...document.querySelectorAll('[data-upgrade]')],
			resetBtn: document.getElementById('reset-btn'),
			achievementsList: document.querySelector('.achievements-list'),
		}
	},

	setupDynamicStyles() {
		const style = document.createElement('style')
		style.textContent = `
            @keyframes coinPulse {
                50% { transform: scale(0.9); }
            }
            .coin-shrink { animation: coinPulse 0.1s ease; }
        `
		document.head.appendChild(style)
	},

	update(element, content) {
		if (this.elements[element]) {
			this.elements[element].textContent = content
		}
	},
}
