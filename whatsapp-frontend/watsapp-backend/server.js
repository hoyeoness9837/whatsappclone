// import packages
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: '1068979',
  key: 'c175be9807d4a93d5b76',
  secret: 'ac6cc917a34443a3fc85',
  cluster: 'us3',
  encrypted: true,
});

// middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url =
  'mongodb+srv://admin:PkU59TOMMyZ8dFas@cluster0.rluwd.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('DB connected');

  const msgCollection = db.collection('messagecontents');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log('error triggering pusher');
    }
  });
});

//api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/api/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/api/messages/new', (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.delete('/api/messages/:id', (req, res) => {
  Messages.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => console.error(err));
});

//listene
app.listen(port, () => console.log(`Listening on localhost:${port}`));
