import mongoose from 'mongoose';

import { Participant } from '../backend/models/Participant.js';


const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1/proga_db';

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error);


export default function(req, res) {
    if (req.method === 'DELETE') {
        return dropDB(req, res);
    }

    res.status(404).send('Not Found');
}


async function dropDB(_req, res) {
    await Participant.remove();

    res.send('ok');
}
