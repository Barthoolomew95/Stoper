const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const historyBtn = document.querySelector('.history')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.info')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.close')

const changeColorBtn = document.querySelector('.change-color')
const colorPalete = document.querySelector('.color-palete')
const changeColorToRedBtn = document.querySelector('.red')
const changeColorToGreenBtn = document.querySelector('.green')
const changeColorToBlueBtn = document.querySelector('.blue')

let countTime
let minutes = 0
let seconds = 0
let miliseconds = 0
const handleStart = () => {
	clearInterval(countTime)
	countTime = setInterval(() => {
		if (miliseconds < 900) {
			miliseconds += 100
			stopwatch.textContent = `${minutes}:${seconds}:${parseInt(miliseconds / 100)}`
		} else if (miliseconds === 900) {
			miliseconds = 0
			seconds++
			stopwatch.textContent = `${minutes}:${seconds}:0`
		}
		if (seconds === 59) {
			minutes++
			seconds = 0
			stopwatch.textContent = `${minutes}:00:0`
		}
	}, 100)
}
const handlePause = () => {
	clearInterval(countTime)
}
const handleStop = () => {
	time.textContent = `Ostatni czas: ${stopwatch.textContent}`
	time.style.visibility = 'visible'
	if (stopwatch.textContent !== '0:00:00') {
		clearInterval(countTime)
		let time = document.createElement('li')
		time.innerHTML = `Pomiar nr ${timeList.children.length + 1} <span>${stopwatch.textContent}</span>`
		minutes = 0
		seconds = 0
		miliseconds = 0
		stopwatch.textContent = '0:00:00'
		timeList.appendChild(time)
	}
}
const handleReset = () => {
	clearInterval(countTime)
	minutes = 0
	seconds = 0
	miliseconds = 0
	stopwatch.textContent = '0:00:00'
	time.style.visibility = 'hidden'
	while (timeList.lastChild) {
		timeList.removeChild(timeList.lastChild)
	}
}
const handleArchive = () => {
	if (timeList.style.display === 'none' || timeList.style.display === '') {
		timeList.style.display = 'block'
	} else {
		timeList.style.display = 'none'
	}
}
const closeModal = () => {
	modalShadow.style.display = 'none'
	modalShadow.classList.remove('modal-animation-close')
}
const changeMainTheme = e => {
	const color = window.getComputedStyle(e.target).getPropertyValue('background-color')
	document.documentElement.style.setProperty('--primary-color', color)
}
// const showModal = () => {}
startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
historyBtn.addEventListener('click', handleArchive)

infoBtn.addEventListener('click', () => {
	modalShadow.style.display = 'block'
	modalShadow.classList.add('modal-animation')
})

// console.log(closeModalBtn)
closeModalBtn.addEventListener('click', () => {
	setTimeout(closeModal, 490)
	modalShadow.classList.remove('modal-animation')
	modalShadow.classList.add('modal-animation-close')
})

changeColorBtn.addEventListener('click', () => {
	if (colorPalete.style.display === 'flex') {
		colorPalete.style.display = 'none'
	} else {
		colorPalete.style.display = 'flex'
	}

	colorPalete.classList.toggle('modal-animation')
	// colorPalete.classList.toggle('modal-animation-close')
})
changeColorToBlueBtn.addEventListener('click', changeMainTheme)
changeColorToRedBtn.addEventListener('click', changeMainTheme)
changeColorToGreenBtn.addEventListener('click', changeMainTheme)
