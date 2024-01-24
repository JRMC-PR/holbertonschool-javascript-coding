#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  const tasks = JSON.parse(body);
  const completedTasks = {};

  tasks.forEach(task => {
    if (task.completed) {
      if (completedTasks[task.userId]) {
        completedTasks[task.userId]++;
      } else {
        completedTasks[task.userId] = 1;
      }
    }
  });

  let output = '{';
  for (const userId in completedTasks) {
    if (completedTasks[userId] > 0) {
      output += `'${userId}': ${completedTasks[userId]},\n`;
    }
  }
  output = output.slice(0, output.length - 2) + ' }';
  console.log(output);
});
