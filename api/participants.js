import './index.js';
import { Participant } from '../backend/models/Participant.js';


const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    return await fn(req, res)
}

// export default allowCors((request, response) => {
//     response.send('ok');
// });


export default function(req, res) {
    if (req.method === 'GET') {
        getParticipants(req, res);
    } else if (req.method === 'POST') {
        createParticipant(req, res);
    }
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
