const fs = require('fs').promises;
const csv = require('csv-parser');

function readDatabase() {
  const filePath = process.argv[2];
  return new Promise((resolve, reject) => {
    const results = {};

    fs.createReadStream(filePath)
      .on('error', (err) => {
        reject(err);
      })
      .pipe(csv())
      .on('data', (data) => {
        if (!results[data.field]) {
          results[data.field] = [];
        }
        results[data.field].push(data.firstname);
      })
      .on('end', () => {
        resolve(results);
      });
  });
}
