export const Utils = {
	/**
	 * Безопасно получает данные из localStorage.
	 * @param {string} key - Ключ хранимых данных.
	 * @param {any} defaultValue - Значение по умолчанию, если данных нет.
	 * @returns {any} - Извлеченные данные или значение по умолчанию.
	 */
	getFromLocalStorage(key, defaultValue = null) {
		try {
			const data = localStorage.getItem(key)
			return data ? JSON.parse(data) : defaultValue
		} catch (error) {
			console.error(`Ошибка загрузки ${key} из localStorage:`, error)
			return defaultValue
		}
	},

	/**
	 * Безопасно сохраняет данные в localStorage.
	 * @param {string} key - Ключ хранимых данных.
	 * @param {any} value - Данные для сохранения.
	 */
	saveToLocalStorage(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error(`Ошибка сохранения ${key} в localStorage:`, error)
		}
	},

	/**
	 * Форматирует число, добавляя разделители тысяч.
	 * @param {number} num - Число для форматирования.
	 * @returns {string} - Форматированное число.
	 */
	formatNumber(num) {
		return num.toLocaleString('ru-RU')
	},

	/**
	 * Ограничивает частоту выполнения функции (debounce).
	 * @param {Function} func - Функция, вызовы которой нужно ограничить.
	 * @param {number} delay - Задержка в миллисекундах.
	 * @returns {Function} - Дебаунс-функция.
	 */
	debounce(func, delay = 300) {
		let timeout
		return function (...args) {
			clearTimeout(timeout)
			timeout = setTimeout(() => func.apply(this, args), delay)
		}
	},
}
