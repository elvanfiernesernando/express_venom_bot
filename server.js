const express = require('express');
const cors = require('cors');
const venom = require('venom-bot');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

venom
  .create({
    session: 'support', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start2(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {

  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}

async function start2(client) {

  client.onMessage((message) => {
    if (message.body === 'Bro' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Oiitt')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}

app.get('/:session_name', async (req, res)=>{
  try {
    console.info(req.params);
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT, ()=>{
    console.info('Server running on PORT: ' + 'PORT')
})