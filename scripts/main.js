import { GameState } from './core/game-state.js'
import { DOM } from './core/dom-manager.js'
import { Upgrades } from './features/upgrades.js'
import { Achievements } from './features/achievements.js'
import { Animations } from './features/animations.js'

document.addEventListener('DOMContentLoaded', () => {
	console.log('🚀 Инициализация игры...')

	GameState.init()
	DOM.init()
	Upgrades.init()
	Achievements.init()
	Animations.init()

	setupEventListeners()
})

/**
 * Настраивает глобальные обработчики событий.
 */
function setupEventListeners() {
	console.log('🎮 Настройка событий...')

	const coin = document.getElementById('coin')
	if (coin) {
		coin.addEventListener('click', handleCoinClick)
	} else {
		console.error('❌ Элемент монеты не найден!')
	}

	const resetButton = document.getElementById('reset-btn')
	if (resetButton) {
		resetButton.addEventListener('click', handleResetProgress)
	} else {
		console.error('❌ Кнопка сброса прогресса не найдена!')
	}
}

/**
 * Обрабатывает клик по монете.
 */
function handleCoinClick(event) {
	console.log('💰 Клик по монете!')
	const multiplier = GameState.getMultiplier()
	GameState.updateScore(multiplier)
	Animations.playCoinClick(event)
	Achievements.check()
}

function handleResetProgress() {
	if (confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
		GameState.reset()
	}
}
