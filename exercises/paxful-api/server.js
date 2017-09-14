import {Server as WebSocketServer} from 'ws';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer();
const wss = new WebSocketServer({server: server});

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('connection');

    ws.on('message', (message) => {
        console.log('received: %s', message);
        const data = JSON.parse(message);
        switch (data.command) {
            case 'start-price-modifications':
                ws.send(JSON.stringify({command: 'modify-price', value: 100 + Math.random() * 10}));
                break;
            case 'price-is-modified':
                ws.send(JSON.stringify({command: 'modify-price', value: 100 + Math.random() * 10}));
                break;
        }
    });

    ws.on('close', function () {
        console.log('stopping');
    });
});

server.on('request', app);
server.listen(8888, () => console.log('Listening on http://localhost:8888'));