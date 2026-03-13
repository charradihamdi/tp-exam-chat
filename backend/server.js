const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({
      error: 'Both author and content are required',
    });
  }

  const message = {
    author: String(author),
    content: String(content),
    timestamp: new Date().toISOString(),
  };

  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
