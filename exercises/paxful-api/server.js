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
                ws.send(JSON.stringify({
                        direction: 'dispatcher',
                        command: 'modify-price',
                        value: {
                            price: 100 + Math.random() * 10,
                            hash: 'wjWmDWN8Po5'
                        }
                    }
                ));
                break;
            case 'price-is-modified':
                //set timeout for the add in 2 mins (paxfull limits)
                setTimeout(() => ws.send(JSON.stringify({
                        direction: 'dispatcher',
                        command: 'modify-price',
                        value: {
                            price: 100 + Math.random() * 10,
                            hash: 'wjWmDWN8Po5'
                        }
                    }
                )), 1000 * 60 * 2);

                break;
        }
    });

    ws.on('close', function () {
        console.log('stopping');
    });
});

server.on('request', app);
server.listen(8888, () => console.log('Listening on http://localhost:8888'));