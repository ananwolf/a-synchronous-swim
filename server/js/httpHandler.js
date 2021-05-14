const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const queue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

var getRandom = () => {
  var directions = ['up', 'down', 'left', 'right'];
  var index = Math.floor(Math.random() * directions.length);
  return directions[index];
};

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
    }

    if (req.url === '/?command=randomMove' && req.method === 'GET') {
      res.writeHead(200, headers);
      res.end(getRandom());
    } else {
    res.writeHead(200, headers);
    res.end();
  }
  next(); // invoke next() at the end of a request to help with testing!
};
