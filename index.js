const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', ws => {
  ws.on('message', array => {
    console.log('received: ', array);
  });

  ws.send('hello client!');
});
