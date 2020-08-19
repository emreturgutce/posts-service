const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(require('cors')());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).json(posts[id]);
});

app.listen(4000, () => console.log('App is running on port 4000'));
