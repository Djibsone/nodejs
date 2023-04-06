/*const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Fichier introuvable');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const indexPath = path.join(__dirname, './views/index.html');
    const cssPath = path.join(__dirname, './assets/style.css');

    fs.readFile(indexPath, 'utf8', (err, html) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('Fichier introuvable');
      } else {
        fs.readFile(cssPath, 'utf8', (err, css) => {
          if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('Fichier introuvable');
          } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(html.replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`));
            res.end();
          }
        });
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('Fichier introuvable');
  }
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
