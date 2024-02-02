const utils = require('../utils');

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const data = await utils.readDatabase('path_to_your_database_file');
      response.status(200);
      response.write('This is the list of our students\n');
      Object.keys(data).sort().forEach((field) => {
        response.write(`Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}\n`);
      });
      response.end();
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (!['CS', 'SWE'].includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const data = await utils.readDatabase('path_to_your_database_file');
      if (!data[major]) {
        response.status(500).send('Major not found');
        return;
      }

      response.status(200).send(`List: ${data[major].join(', ')}`);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
