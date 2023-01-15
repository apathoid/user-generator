import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    surname: String,
    patronymic: String,
    birthday: String,
    email: String,
    phone: String,
    conference: String,
    report: {
        active: Boolean,
        subject: String
    }
});


export const Participant =  mongoose.model('Participant', ParticipantSchema);
