const http = require('http')
const port = process.env.PORT || 4000

const server = http.createServer(function(req, res) {
	const reqHeaders = req.headers
	const reqMethod = req.method
	const reqURL = req.url

	const responseBody = { headers: reqHeaders, method: reqMethod, url: reqURL }

	if (reqMethod === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify(responseBody, null, 2))
	}
	res.end()
})

server.listen(port, function() {
	console.log('api is working', server.address(), 'port:', port)
})
