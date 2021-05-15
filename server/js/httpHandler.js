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
  console.log('Serving request type ' + req.method + ' for url ' +
  req.url);

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(queue.dequeue());
    next();
  }

  if (req.url === '/?command=randomMove' && req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(getRandom());
    next();
  }

  if (req.url === '/background' && req.method === 'GET') {
    console.log('this is the image at backgroundImageFile: ' + module.exports.backgroundImageFile);

    fs.readFile(module.exports.backgroundImageFile, (err, data) => {
      if (err) {
        res.writeHead(404, headers);
        console.log('No Data');
      } else {
        res.writeHead(200, headers);
        res.write(data, 'binary');
      }
      res.end();
      next();
    });
  }

  if (req.url === '/' && req.method === 'POST') {
    res.writeHead(200, headers);
    req.on('data', (data) => {
      queue.enqueue(data);
    })
    res.end();
    next();
  }
};
