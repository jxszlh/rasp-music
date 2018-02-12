const express = require('express')
const app = express()
const rpio = require('rpio')

const pins = [12, 32, 33, 35];
const range = 255;
const clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */

pins.forEach(pin => {
  rpio.open(pin, rpio.PWM);
  rpio.pwmSetClockDivider(clockdiv);
  rpio.pwmSetRange(pin, range);
});

pins.forEach(pin => rpio.pwmSetData(pin, 255))
setTimeout(() => pins.forEach(pin => rpio.pwmSetData(pin, 0)), 5000)

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: ', message);
    const array = JSON.parse(message);
    array.forEach((value, index) => rpio.pwmSetData(pins[index], value));
  });

  ws.send('hello client!');
});
