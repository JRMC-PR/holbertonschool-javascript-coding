#!/usr/bin/node
const https = require('https');
const http = require('http');

const url = process.argv[2];
const protocol = url.startsWith('https') ? https : http;

protocol.get(url, (res) => {
  console.log(`code: ${res.statusCode}`);
  process.exit();
}).on('error', (res) => {
  console.error(`code: ${res.statusCode}`);
  process.exit(1);
});
