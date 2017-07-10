const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')

app.get('/justintimberlake', (req, res, next) => {
  res.send({ jtSays: 'Bring it on down to Omletteville.' })
  next
})

app.get('/justintimberlake/awful', (req, res, next) => {
  const jtError = new HTTPError(400, 'impossible request', {
    developerMessage:
      'You travelled down this road too long, try to find your way back home. This link is dead and gone.',
    userMessage: 'Cry me a river.',
    errorCode: 123,
    moreInfo: 'http://dev.jt.com/errors/123'
  })
  return next(jtError)
})

app.get('/justintimberlake/uglyfront', (req, res, next) => {
  const jtError2 = new HTTPError(400, 'impossible request', {
    didYouMean: '/sexyback',
    errorCode: 246,
    moreInfo: 'http://dev.jt.com/errors/246'
  })
  return next(jtError2)
})

app.use(function(err, req, res, next) {
  console.log('method: ', req.method, ' path: ', req.path, ' error: ', err)
  res.status(err.status || 500).send(err)
})
app.listen(3000, () => console.log('dis shit workin'))
