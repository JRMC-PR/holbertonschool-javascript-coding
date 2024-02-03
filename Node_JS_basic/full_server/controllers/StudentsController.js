import { readDatabase } from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    readDatabase('./database.csv')
      .then((data) => {
        const response = ['This is the list of our students'];
        Object.keys(data).sort().forEach((field) => {
          const names = data[field].join(', ');
          response.push(`Number of students in ${field}: ${data[field].length}. List: ${names}`);
        });

        res.status(200).send(response.join('\n'));
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    readDatabase('./database.csv')
      .then((data) => {
        if (!data[major]) {
          return res.status(500).send('Cannot load the database');
        }

        const names = data[major].join(', ');
        res.status(200).send(`List: ${names}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
