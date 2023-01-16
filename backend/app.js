import express from 'express';
import createError from 'http-errors';
import path from 'path';


const PORT = process.env.PORT || '3000';


const app = express();

app.use(express.static(path.resolve('.') + '/frontend/public'));
app.use(express.json());

app.use((_req, _res, next) => {
    next(createError(404));
});

app.listen(PORT, () => {
    console.log(`listen on ${PORT}`);
});
