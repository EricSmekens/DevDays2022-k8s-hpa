'use strict';
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.get('/', (req, res) => {
  var i;
  for(var z =0;  z < getRandomInt(9999999); z++){
    i = Math.sqrt(getRandomInt(9999999)).toString()
  }
  console.log(i);
  res.send(i);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/health', (req, res) => {
  res.send({status: "UP"});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);