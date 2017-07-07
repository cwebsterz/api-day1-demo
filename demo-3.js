const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 4000
const path = require('path')

const server = http.createServer(function(req, res) {
	if (req.method === 'GET' && req.url === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.write('<html>')
		res.write('<body>')
		res.write('<h2>Welcome!</h2>')
		res.write('<p>Try a GET /octocat</p>')
		res.write('</body>')
		res.write('</html>')
		res.end()
	} else if (req.method === 'GET' && req.url === '/octocat') {
		const img = fs.readFileSync(
			path.join(__dirname, './assets/img/octocat.png')
		)
		res.writeHead(200, { 'Content-Type': 'image/png' })
		res.end(img, 'binary')
	} else {
		res.statusCode = 404
		res.end
	}
})

server.listen(port, () => console.log('api working:', port))
