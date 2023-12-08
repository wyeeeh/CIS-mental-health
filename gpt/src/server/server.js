const express = require('express');
const openai = require('openai');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

openai.apiKey = process.env.OPENAI_API_KEY;

app.get('/api/chat', (req, res) => {
  res.send('Welcome to the ChatGPT API');
});

app.post('/api/chat', async (req, res) => {
  const userInput = req.body.input;

  try {
    const response = await openai.Completion.create({
      engine: 'text-davinci-003',
      prompt: userInput,
      max_tokens: 150,
    });

    res.json({ reply: response.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
