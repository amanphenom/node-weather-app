const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configs
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amandeep'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amandeep'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text',
        title: 'Help Page',
        name: 'Amandeep'
    })
})


app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }
    address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })

    // res.send({
    //     location: 'Delhi',
    //     forecast: 'forecast',
    //     address: req.query.address,
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        errorMessage: 'Help Article not found',
        name: 'Amandeep'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Amandeep'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})