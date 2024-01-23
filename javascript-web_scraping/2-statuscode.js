#!/usr/bin/node
const https = require('https');

https.get(process.argv[2], (res) => {
  console.log(`code: ${res.statusCode}`);
  process.exit();
}).on('error', (res) => {
  console.error(`code: ${res.statusCode}`);
  process.exit(1);
});
