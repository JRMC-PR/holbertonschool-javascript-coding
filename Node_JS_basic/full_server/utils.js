const fs = require('fs');
const csv = require('csv-parser');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    const data = {};
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (!data[row.field]) data[row.field] = [];
        data[row.field].push(row.firstname);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = readDatabase;
