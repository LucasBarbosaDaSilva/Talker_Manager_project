const express = require('express');
const fs = require('fs').promises;
const crypto = require('../node_modules/crypto-random-string');
const { loginValidation, 
  tokenValidation, 
  validateName, 
  validateAge,
  validateWatchedAt,
  validateTalk } = require('./middleWares/middleWares');
const { readData, readById } = require('./utils/fcUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const data = await readData();
  if (!data || data.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const data = await readData();
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(data);
  }
  const result = data.filter((talker) => talker.name.includes(q));
  if (result.length === 0) {
    return res.status(HTTP_OK_STATUS).json([]);
  }
  return res.status(HTTP_OK_STATUS).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readById(id);
   if (!data) {
   return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
   } 
    return res.status(HTTP_OK_STATUS).json(data);
});

app.post('/talker', tokenValidation, 
validateAge, validateName, 
 validateTalk, validateWatchedAt, async (req, res) => {
  const jsonContent = await readData();
    req.body.id = jsonContent.length + 1;
    jsonContent.push(req.body);
    await fs.writeFile('src/talker.json', JSON.stringify(jsonContent));
    res.status(201).json(req.body);
});

app.put('/talker/:id', tokenValidation,
  validateAge, validateName,
  validateTalk, validateWatchedAt, async (req, res) => {
  const { id } = req.params;
  const jsonContent = await readData();
  const index = jsonContent.findIndex((talker) => talker.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const newTalker = { id: Number(id), ...req.body };
  jsonContent[index] = newTalker;
  await fs.writeFile('src/talker.json', JSON.stringify(jsonContent));
  res.status(200).json(newTalker);
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const jsonContent = await readData();
  const index = jsonContent.findIndex((talker) => talker.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  jsonContent.splice(index, 1);
  await fs.writeFile('src/talker.json', JSON.stringify(jsonContent));
  res.status(204).json();
});
  
app.post('/login', loginValidation, (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: crypto(16) });
});