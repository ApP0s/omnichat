require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define Message schema and model
const messageSchema = new mongoose.Schema({
  user_id: String,
  message_text: String,
  timestamp: Number
});

const Message = mongoose.model('Message', messageSchema);

// Endpoint to save message
app.post('/save_message', async (req, res) => {
  try {
    const { user_id, message_text, timestamp } = req.body;
    const newMessage = new Message({ user_id, message_text, timestamp });
    await newMessage.save();
    res.status(200).send('Message saved');
    console.log('Message saved')
  } catch (error) {
    console.error('Error saving message:', error.message);
    res.status(500).send('Error saving message');
  }
});

// Endpoint to get messages
app.get('/get_messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error.message);
    res.status(500).send('Error retrieving messages');
  }
});

app.listen(5001, () => {
  console.log('Backend API listening on port 5001');
});
