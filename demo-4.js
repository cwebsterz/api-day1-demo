const express = require('express')
const app = express()

app.get('/hello/:helloId/world/:worldId', (req, res) => {
	res.send(req.params)
})

app.listen(3000, () => {
	console.log('app listening on port')
})
