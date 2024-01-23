#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  let count = 0;
  const films = JSON.parse(body).results;

  films.forEach(film => {
    film.characters.forEach(character => {
      if (character.endsWith('/18/')) {
        count++;
      }
    });
  });

  console.log(count);
});
