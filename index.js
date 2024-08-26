const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv');

dotenv.config(); // Correct way to load .env variables

const app = express();

const lineconfig = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_TOKEN,
};

app.post('/webhook', line.middleware(lineconfig), async (req, res) => {
  try {
    const events = req.body.events;
    console.log('events=>>>>>', events);
    return events.length > 0
      ? await Promise.all(events.map((item) => handleEvent(item)))
      : res.status(200).send('OK');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
});

const handleEvent = async (event) => {
  console.log(event);
  if (event.type === 'message' && event.message.type === 'text') {
    const userId = event.source.userId;
    const messageText = event.message.text;
    const timestamp = event.timestamp;

    // Send data to backend API
    try {
      await axios.post('https://336c-168-120-248-13.ngrok-free.app/save_message', {
        user_id: userId,
        message_text: messageText,
        timestamp: timestamp
      });
    } catch (error) {
      console.error('Error saving message:', error.message);
    }
  }
};

app.listen(4000, () => {
  console.log('listening on 4000');
});
