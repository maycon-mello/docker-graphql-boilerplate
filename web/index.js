var http = require('http');

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.end('Web server response');
});

server.listen(PORT, () =>
  console.log(`Web server running on port ${PORT}.`)
)
