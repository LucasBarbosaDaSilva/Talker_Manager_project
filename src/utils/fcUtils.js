const fs = require('fs').promises;
const path = require('path');

async function readData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 'utf-8');
    const result = JSON.parse(data);

      return result;
  } catch (error) {
    return [];
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

// async function writeData(data) {
//   try {
//     const oldData = await readData();
//     const newDataWithId = { id: oldData.length + 1, ...data };
//     const allData = [...oldData, newDataWithId];

//     await fs.writeFile('src/data/talker.json', JSON.stringify(allData), 'utf-8');
//     return newDataWithId;
    
//   } catch (error) {
//     console.error(`Erro ao escrever no arquivo: ${error}`);
//   }
// }

module.exports = {
  readData,
  readById,
};