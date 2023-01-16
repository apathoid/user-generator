import './index.js';

import { Participant } from '../backend/models/Participant.js';


export default function(req, res) {
    if (req.method === 'GET') {
        return getParticipants(req, res);
    } else if (req.method === 'POST') {
        return createParticipant(req, res);
    }

    res.status(404).send('Not Found');
}


async function getParticipants(_req, res) {
    const participants = await Participant.find();

    res.send(participants);
}

async function createParticipant(req, res) {
    const participant = new Participant(req.body);
    await participant.save();

    res.send(participant);
}
