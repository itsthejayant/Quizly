import { NextResponse } from 'next/server';
import { connectToDb } from "../../../lib/services/db"
import Quiz from '../../../lib/models/quiz';
import User from '../../../lib/models/user';
import AttemptQuiz from '@/lib/models/attemptquiz';
import Scores from '@/lib/models/scores';

export async function POST(req: Request){
    try{
        const {answers, attemptedBy, quizId} = await req.json()
        await connectToDb();
        const startedQuiz = await AttemptQuiz.findOneAndDelete({ quizId: quizId, attemptedBy:attemptedBy });
        const quiz = await Quiz.findOne({ _id: quizId});
        if(startedQuiz){
            let score = 0,correct=0;
            for(let i=0;i <answers.length;i++){
                if(Number(quiz.questions[i].answer) === Number(answers[i])+1){
                    score += Number(quiz.positiveMarks); 
                    correct++;
                }
                else score += Number(quiz.negativeMarks);
                // console.log("in score is ",score)
            }
            console.log("score is ",score)
            const updatedQuiz = await User.findOneAndUpdate(
                { 
                    email: attemptedBy, // Filter criteria to find the user
                    "quizIds.quizId": quizId // Filter criteria to find the quizId within quizIds array
                },
                {
                    $set: {
                        "quizIds.$.score": score,
                        "quizIds.$.isAttempted": true
                    }
                },
                { new: true, runValidators: true }
            ).exec();
            await Scores.create({quizId: quizId, attemptedBy:attemptedBy, answers:answers, score:score, correct:correct, title: quiz.title })
            return NextResponse.json({success : true});
        }
        else NextResponse.json({success: false});
    }
    catch(e){
        console.log("server fetch quizes for user error",e);
        return Response.error()
    }
}
