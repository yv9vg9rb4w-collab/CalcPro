// server.cjs
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // charge les variables d'environnement depuis .env
const OpenAI = require('openai');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // sert les fichiers HTML à la racine

// Configuration OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // clé sécurisée depuis .env
});

// Route API pour interroger l'IA
app.post('/api/ask', async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // modèle rapide et économique
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur avec OpenAI" });
  }
});

// Routes pour tes pages HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/3d', (req, res) => {
  res.sendFile(path.join(__dirname, '3d.html'));
});

app.get('/ai', (req, res) => {
  res.sendFile(path.join(__dirname, 'ai.html'));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
