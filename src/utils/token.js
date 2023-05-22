const crypto = require('crypto');

function creatToken(size) {
  return crypto.randomBytes(size).toString('hex');
}

module.exports = {
  creatToken,
};