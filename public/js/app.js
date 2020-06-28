
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

//messageOne.textContent = 'From js'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    const location = searchElement.value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                return console.log(data.error)
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
            console.log(data)
        })
    })
})