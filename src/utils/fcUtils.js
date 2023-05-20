const fs = require('fs').promises;
const path = require('path');

async function readData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '../data/talker.json'));
    const result = JSON.parse(data);

      return result;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
}

async function readById(id) {
  try {
    const data = await readData();
    const result = data.find((talker) => talker.id === Number(id));

    return result;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
} 



module.exports = {
  readData,
  readById,
};