import fs from 'fs';

export const readDatabase = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const students = data.split('\n').reduce((acc, line) => {
          const [field, name] = line.split(',');
          if (!acc[field]) acc[field] = [];
          acc[field].push(name);
          return acc;
        }, {});

        resolve(students);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
};
