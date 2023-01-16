import express from 'express';
import createError from 'http-errors';
import path from 'path';


const PORT = process.env.PORT || '3000';


const app = express();

app.use(express.static(path.resolve('.') + '/frontend/public'));
app.use(express.json());

// app.get('/api/participants', async (_req, res) => {
//     const participants = await Participant.find();
//
//     res.send(participants);
// });
//
// app.post('/api/participants', async (req, res) => {
//     const participant = new Participant(req.body);
//     await participant.save();
//
//     res.send(participant);
// });
//
// app.delete('/api/participants/:id', async (req, res) => {
//     await Participant.findByIdAndDelete(req.params.id);
//
//     res.send('ok');
// });
//
// app.delete('/api', async (_req, res) => {
//     await Participant.remove();
//
//     res.send('ok');
// });

app.use((_req, _res, next) => {
    next(createError(404));
});

app.listen(PORT, () => {
    console.log(`listen on ${PORT}`);
});
