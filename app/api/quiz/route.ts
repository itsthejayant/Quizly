import { NextResponse } from 'next/server';
import { connectToDb } from "../../../lib/services/db"
import Quiz from '../../../lib/models/quiz';
import User from '../../../lib/models/user';
import Scores from '@/lib/models/scores';

// quiz hosting submission request from /hostquiz/addusers
export async function POST(request: Request) {
    try{
        const {quizInfo, questions, emails} = await request.json()
        await connectToDb();
        const newQuiz = await Quiz.create({title: quizInfo.title,
                                        startDate: new Date(quizInfo.startDate),
                                        endDate: new Date(quizInfo.endDate),
                                        startTime: quizInfo.startTime,
                                        endTime: quizInfo.endTime,
                                        timeLimit: quizInfo.timeLimit, 
                                        positiveMarks: quizInfo.positiveMarks, 
                                        negativeMarks: quizInfo.negativeMarks, 
                                        questions: questions,
                                        emails: emails,
        })
        for (const email of emails) {
            try {
                const updatedQuiz = await User.findOneAndUpdate(
                    { email }, // Filter criteria
                    { $addToSet: { quizIds: { $each: [{ quizId: newQuiz._id, score: -1, isAttempted: false }] } } }, // Update operation
                    { new: true, runValidators: true } // Options
                ).exec();

                console.log(`Updated user with email ${email}:`, updatedQuiz);
            } catch (error) {
                console.error(`Failed to update user with email ${email}:`, error);
            }
        }
        return Response.json({message: 'Done'})
    }
    catch(e){
        console.log("server host quiz error",e);
        return Response.error()
    }
}

export async function GET(req: Request){
    try{
        const {searchParams} = new URL(req.url);
        const email = searchParams.get('email');
        if (!email) {
            return NextResponse.json({ message: 'Email query parameter is required' }, { status: 400 });
        }
        await connectToDb();
        const quizzes = await Quiz.find({ emails: email });
        const user  = await User.findOne({email:email});
        // console.log("user->", user)
        const quizArr = quizzes.map((quiz)=>{
            // console.log("quiz->", quiz)
            let obj = user.quizIds.filter((ele:any)=>ele.quizId === quiz._id.toString());
            // console.log("obj->", obj)
            return {
                title:quiz.title,
                startDate: quiz.startDate,
                startTime: quiz.startTime,
                endDate: quiz.endDate,
                endTime: quiz.endTime,
                noofQuestions: quiz.questions.length,
                timeLimit: quiz.timeLimit,
                positiveMarks: quiz.positiveMarks,
                negativeMarks: quiz.negativeMarks,
                id:quiz._id,
                isAttempted: obj[0].isAttempted,
            }
        })
        return NextResponse.json(quizArr);
    }
    catch(e){
        console.log("server fetch quizes for user error",e);
        return Response.error()
    }
}
