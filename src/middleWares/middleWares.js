const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age <= 18 || typeof age !== 'number' || !Number.isInteger(age)) {
    return res.status(400)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) { return res.status(400).json({ message: 'O campo "talk" é obrigatório' }); }

   if (talk.rate < 1 || talk.rate > 5 || talk.rate === 0) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  } 
  next();
};

const validateWatchedAt = (req, res, next) => {
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  const { talk } = req.body;
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } if (!regexDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } if (!talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  
  if (!Number.isInteger(talk.rate)) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = {
  loginValidation,
  tokenValidation,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
};
