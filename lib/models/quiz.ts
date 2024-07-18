import { Document, model, models, Schema } from "mongoose";

export interface IQuestion {
    question: string;
    options: string[];
    answer: string;
}

export interface IQuiz extends Document {
    title: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    timeLimit: number;
    positiveMarks?: string;
    negativeMarks?: string;
    questions: IQuestion[];
    emails: string[];
    // hostedBy: string,
}

const QuizSchema = new Schema({
    title: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timeLimit: { type: Number, required: true }, 
    positiveMarks: { type: String }, 
    negativeMarks: { type: String }, 
    questions: [{
        question: { type: String },
        answer: { type: String },
        options: { type: [String] },
    }],
    emails: [{ type: String }],
    // hostedBy:{type: String, required:true}
})

const Quiz = models.Quiz || model('Quiz', QuizSchema);

export default Quiz;