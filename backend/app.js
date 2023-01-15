import express from 'express';
import createError from 'http-errors';
import path from 'path';
import mongoose from 'mongoose';

import { Participant } from './models/Participant.js';


const PORT = process.env.PORT || '3000';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/proga_db';


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error);


const app = express();

app.use(express.static(path.resolve('.') + '/frontend/dist'));
app.use(express.json());

app.get('/participants', async (_req, res) => {
    const participants = await Participant.find();

    res.send(participants);
});

app.post('/participants', async (req, res) => {
    const participant = new Participant(req.body);
    await participant.save();

    res.send(participant);
});

app.delete('/participants/:id', async (req, res) => {
    await Participant.findByIdAndDelete(req.params.id);

    res.send('ok');
});

app.delete('/', async (_req, res) => {
    await Participant.remove();

    res.send('ok');
});

app.use((_req, _res, next) => {
    next(createError(404));
});

app.listen(PORT, () => {
    console.log(`listen on ${PORT}`);
});
