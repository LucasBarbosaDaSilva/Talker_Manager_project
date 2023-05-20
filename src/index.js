const express = require('express');
const fs = require('fs');
const { readData, readById } = require('./utils/fcUtils');
const e = require('express');

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
  res.status(HTTP_OK_STATUS).json(data) || [];
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readById(id);
   if (!data) {
   return res.status(404).json({ message: 'Pessoa palestrante não encontrada' })
   } else {
    res.status(HTTP_OK_STATUS).json(data);
    }
}
);