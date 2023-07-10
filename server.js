const http = require('http');
const fs = require('fs');

const hostname = '74.141.204.247';
const port = 3000;
const server = http.createServer(async (req, res) => {
  try{
    console.log(req.headers);

    let data = "", type = "";

    if (req.url === '/'){
      data = fs.readFileSync('./home.html', { encoding: 'utf8', flag: 'r' });
      type = 'text/html';
    }
    if (req.url === '/test.js'){
      data = fs.readFileSync("." + req.url, { encoding: 'utf8', flag: 'r' });
      type = 'text/javascript';
    }
    
    res.statusCode = 200;

    res.setHeader('Content-Type', type);
    res.write(data);

    res.end();
    console.log("request satisfied");
  }
  catch(Exception){
    console.log("Hard Crash Detected\n" + Exception);
    res.statusCode = 500;
    res.write('');
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});