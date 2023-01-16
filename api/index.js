import mongoose from 'mongoose';


const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1/proga_db';

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error);
