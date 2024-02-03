const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const data = await readDatabase('./database.csv');
      let response = 'This is the list of our students\n';
      for (const field in data) {
        response += `Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}\n`;
      }
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    if (!['CS', 'SWE'].includes(req.params.major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const data = await readDatabase('./database.csv');
      const students = data[req.params.major];
      res.status(200).send(`List: ${students.join(', ')}`);
    } catch (err) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
