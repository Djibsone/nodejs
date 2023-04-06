const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('./views/index.html', 'utf8', (err, html) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('introuvable')
            } else {
                fs.readFile('./assets/style.css', 'utf8', (err, css) => {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.end('introuvable')
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                        res.write(html.replace('<link rel="stylesheet" href="style.css">', `<style>${css}</style>`));
                        res.end()
                    }
                });
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('introuvable')
    }
});

server.listen(3030, '127.0.0.1', () => {
    console.log('Serveur en écoute sur le port 3030');
});