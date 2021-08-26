const http = require('http')

const host = '127.0.0.1'
const port = '7001'

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('content-type', 'text/plain');
  res.end('Hello nodejs~~')
})

server.listen(port, host, () => {
  console.log(`servering is runing at $http://${host}:${port}/`)
})









































// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
