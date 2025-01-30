import { GameState } from './core/game-state.js'
import { DOM } from './core/dom-manager.js'
import { Achievements } from './features/achievements.js'
import { Animations } from './features/animations.js'
import { Upgrades } from './features/upgrades.js'

Upgrades.init()

class Game {
	static init() {
		DOM.init()
		GameState.init()
		Achievements.init()
		Animations.init()
		this.setupEventListeners()
		this.startGameLoop()
		this.loadSavedGame()
	}

	static setupEventListeners() {
		DOM.elements.upgrades.forEach(button =>
			button.addEventListener('click', () =>
				this.handleUpgrade(button.dataset.upgrade)
			)
		)

		DOM.elements.resetBtn.addEventListener('click', () => this.resetProgress())
		DOM.elements.coin.addEventListener('click', () => this.handleCoinClick())
	}

	static handleCoinClick() {
		const multiplier =
			GameState.state.upgrades.multiplier.count > 0
				? Math.pow(2, GameState.state.upgrades.multiplier.count)
				: 1

		GameState.state.score += multiplier
		DOM.update('score', GameState.state.score)
		Animations.playCoinClick()
		Achievements.check()
		GameState.save()
	}

	static loadSavedGame() {
		GameState.load()
		DOM.update('score', GameState.state.score)
		DOM.elements.upgrades.forEach(button => {
			const type = button.dataset.upgrade
			const upgrade = GameState.state.upgrades[type]
			if (upgrade) this.updateShopButton(type, upgrade)
		})
	}

	static handleUpgrade(type) {
		// Получаем текущее состояние улучшения
		const upgrade = GameState.state.upgrades[type]

		// Проверка существования улучшения
		if (!upgrade) {
			console.error(`Улучшение "${type}" не найдено`)
			return
		}

		// Проверка возможности покупки
		if (GameState.state.score >= upgrade.currentPrice) {
			// Совершаем покупку
			GameState.state.score -= upgrade.currentPrice
			upgrade.count++

			// Пересчет цены (15% увеличение за уровень)
			upgrade.currentPrice = Math.floor(
				upgrade.basePrice * Math.pow(1.15, upgrade.count)
			)

			// Обновляем интерфейс
			DOM.update('score', GameState.state.score)
			this.updateShopButton(type, upgrade)

			// Проверяем достижения
			Achievements.check()

			// Сохраняем прогресс
			GameState.save()

			// Воспроизводим анимацию
			Animations.playPurchaseEffect(type)
		} else {
			console.warn(`Недостаточно средств для улучшения "${type}"`)
			Animations.playErrorEffect(type)
		}
	}

	static updateShopButton(type, upgrade) {
		const button = DOM.elements.upgrades.find(
			btn => btn.dataset.upgrade === type
		)
		if (!button) return

		button.querySelector('.price').textContent = upgrade.currentPrice
		button.querySelector('.count').textContent = upgrade.count
		button.classList.toggle(
			'disabled',
			GameState.state.score < upgrade.currentPrice
		)
	}

	static startGameLoop() {
		const gameLoop = () => {
			requestAnimationFrame(gameLoop)
			// Основная игровая логика
		}
		gameLoop()
	}

	static resetProgress() {
		if (confirm('Сбросить прогресс?')) {
			localStorage.removeItem('coinClickerSave')
			GameState.init()
			DOM.update('score', 0)
		}
	}
}

// Запуск игры
document.addEventListener('DOMContentLoaded', () => Game.init())
