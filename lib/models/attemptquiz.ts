import { Document, model, models, Schema } from "mongoose";

export interface IQuiz extends Document {
    attemptedBy: string,
    quizId: string,
    startDateTime: Date,
}

const AtttemptQuizSchema = new Schema({
    attemptedBy: { type: String, required: true, unique: true },
    quizId: { type: String, required: true },
    startDateTime: { type: Date, required: true },
})

const AttemptQuiz = models.AttemptQuiz || model('AttemptQuiz', AtttemptQuizSchema);

export default AttemptQuiz