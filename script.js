const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#ff595e', '#ff924c', '#ffca3a', '#c5ca30', '#8ac926',
    '#36949d', '#1982c4', '#4267ac', '#565aa0', '#6a4c93',]
const sound = new Audio('assets/sound.mp3')
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        sound.play()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {

        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    createFinalScreen()
}

function createFinalScreen() {
    board.innerHTML =
        `<div>
        <div>
            <h1>Cчет: <span class="primary">${score}</span></h1>
        </div>
        <div>
            <button class="time-btn" id="exit">Выход</button>
        </div>
    </div>`

    const exitBtn = document.querySelector('#exit')

    exitBtn.addEventListener('click', () => {
        location.reload()
    })
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const color = getRandomColor()
    const size = getRandomNumber(15, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.style.background = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 25px ${color}`

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

// Fun Mode: run in console -> winTheGame()
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 50)
}