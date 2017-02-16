try {
const path = require('path')
const { resolve } = require('path');
const apiUrl = 'http://api.brewerydb.com/v2'
const apiKey = '1a695597ca6832c03be6be700af79de4'
var express = require('express') 
var bodyParser = require('body-parser') // Node.js body parsing middleware
var request = require('request')
var app = express()
var httpServer =  require('http').createServer(app)
var requireUrl = require('url')

//CORS middleware
var allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')));

if (process.env.ENV !== 'production') {
	app.use(allowCrossDomain)
	app.get('/', (req, res, next) => {
	    res.sendFile(resolve(__dirname, 'dist') + '/index.html')
	});
}

app.get('/styles', (req, res, next) => {
	let url = `${apiUrl}/styles?key=${apiKey}`
	request.get(url, (err, request, json) => {
	if (err) return next(err)
		var data = JSON.parse(json)
		res.send({data})
	})
})

app.get('/beers', (req, res, next) => {
	let url = `${apiUrl}/beers/`,
		query = requireUrl.parse(req.url,true).search
    url = `${url}${query}&key=${apiKey}`
    console.log(url)
	request.get(url, (err, request, json) => {
	if (err) return next(err)
		var data = JSON.parse(json)
		res.send({data})
	})
})

	app.listen(3080, () => {
	  console.log('Brewery Server listening on port 3080......')
	})
} catch(err) {
	console.log('ok, server is running...')
}

