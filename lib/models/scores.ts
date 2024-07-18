import { Document, model, models, Schema } from "mongoose";

export interface IQuiz extends Document {
    attemptedBy: string,
    quizId: string,
    startDateTime: Date,
}

const ScoresSchema = new Schema({
    attemptedBy: { type: String, required: true},
    quizId: { type: String, required: true },
    score: { type: String, required: true },
    answers: {type:[String],},
    correct: {type: String},
    title: {type: String},
})

const Scores = models.Scores || model('Scores', ScoresSchema);

export default Scores