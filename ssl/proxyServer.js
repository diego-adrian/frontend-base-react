var https = require('https');
var fs = require('fs');
var path = require('path');

httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 3000
  },
  ssl: {
    key: fs.readFileSync(path.resolve(__dirname, 'server.key'), 'utf8'),
    cert: fs.readFileSync(path.resolve(__dirname, 'server.cert'), 'utf8')
  }
}).listen(3000);