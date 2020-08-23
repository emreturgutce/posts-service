const express = require('express')
const { randomBytes } = require('crypto')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(require('cors')())

const posts = {}

app.get('/posts', (req, res) => {
  res.json(posts)
})

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = { id, title }

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: { id, title },
  })

  res.status(201).json(posts[id])
})

app.post('/events', (req, res) => {
  res.json({})
})

app.listen(4000, () => console.log('App is running on port 4000'))
