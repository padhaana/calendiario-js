/*import {
	Q, on, append, DAYS, init, create, setContent, range, aboutDate, pattern
} from './utils.js'*/

document.addEventListener('DOMContentLoaded', function () {
	let weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
	let daysOfTheMonth = []
	let firstWeek = []
	let emptyDays = []

	let calendar = document.querySelector('ul')

	let today = new Date()
	let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
	// Hack para el último día del mes
	let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

	for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
		daysOfTheMonth.push(i) // todos los días desde 1 hasta último día
	}
	/* Esto es nuevo y más sencillo de entender:
			El número de espacios vacíos en la primera semana del calendario
			corresponden con el día calendario del primer día del mes
			Ejemplo:
			Si es viernes (5) tendrá entonces (5) espacios vacios
			Si es domingo (0) tendrá entonces (0) espacios vacíos
	*/
	emptyDays = [...' '.repeat(firstDayOfMonth.getDay())]

	daysOfTheMonth = [...weekDays, ...emptyDays, ...firstWeek, ...daysOfTheMonth]

	for (let i = 0; i < daysOfTheMonth.length; i++) {
		let li = document.createElement('li')
		li.innerHTML = daysOfTheMonth[i] // contenido de cada nodo
		calendar.appendChild(li)
	}

})

/*init((ev) => {
	const weekDays = DAYS.map(day => day.at(0)).map(day => day.toUpperCase())
	const {firstDayOfMonth, lastDayOfMonth} = aboutDate()

	const calendar = Q('ul')

	let daysOfTheMonth = range(1, lastDayOfMonth.getDate())
	const emptyDays = pattern(firstDayOfMonth.getDay(), '')

	daysOfTheMonth = [...weekDays, ...emptyDays, ...daysOfTheMonth]
		.map(day => {
			const li = create('', 'li')
			setContent(li, day)
			return li
		})

	append(calendar, daysOfTheMonth)
})*/
