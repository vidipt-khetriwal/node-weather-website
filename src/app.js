const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//set up handle bar engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: "Weather",
        name: 'Vidipt Khetriwal'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Vidipt Khetriwal'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Help me with this',
        title: 'Help',
        name: 'Vidipt Khetriwal'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'Address needs to be provided'
        })
    }

    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if (error)
        {
            return res.send({
                error: error
            })
        }

        forecast(longitude,latitude, (error, forecastData) => {
            if (error)
            {
                return res.send({
                    error: error
                })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })

})



app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Vidipt Khetriwal',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Vidipt Khetriwal',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port port' + port)
})