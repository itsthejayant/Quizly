import { NextResponse } from 'next/server';
import { connectToDb } from "../../../lib/services/db"
import Quiz from '../../../lib/models/quiz';
import User from '../../../lib/models/user';
import AttemptQuiz from '@/lib/models/attemptquiz';
import { parseISO, formatISO, isWithinInterval } from 'date-fns';

export async function POST(req: Request){
    try{
        const {quizId, attemptedBy, startDateTime} = await req.json()
        await connectToDb();
        const startedQuiz = await AttemptQuiz.findOne({ quizId: quizId, attemptedBy:attemptedBy });
        const quiz = await Quiz.findOne({ _id: quizId});
        console.log("startdatetime -> ",startDateTime)
        console.log("quiz->",quiz)
        if(startedQuiz){
            const questions = quiz.questions.map((q:any)=>({
                question:q.question,
                options:q.options,
            }))
            return NextResponse.json({quizId: startedQuiz.quizId,
                                    attemptedBy: startedQuiz.attemptedBy,
                                    startDateTime:startedQuiz.startDateTime, 
                                    questions : questions, 
                                    timeLimit: quiz.timeLimit,
                                    new:false,
                                });
        }
        else{
            // if(isCurrentTimeBetween({ startDate: quiz.startDate, startTime: quiz.startTime, endDate: quiz.endDate, endTime:quiz.endTime })){
                const response = await AttemptQuiz.create({quizId, attemptedBy, startDateTime});
                const questions = quiz.questions.map((q:any)=>({
                    question:q.question,
                    options:q.options,
                }))
                console.log("yaha")
                return NextResponse.json({quizId: response.quizId,
                                        attemptedBy: response.attemptedBy,
                                        startDateTime: response.startDateTime, 
                                        questions : questions, 
                                        timeLimit: quiz.timeLimit,
                                    });
            // }
            // else {                
            //     console.log("not appropriate time to start quiz")
            //     return NextResponse.json({invalid: true})
            // }
        }
    }
    catch(e){
        console.log("server fetch quizes for user error",e);
        return Response.error()
    }
}

// const combineDateAndTime = (date, time) => {
//   const parsedDate = parseISO(date);
//   const [hours, minutes] = time.split(':').map(Number);
//   return add(parsedDate, { hours, minutes });
// };

// const isCurrentTimeBetween = ({ startDate, startTime, endDate, endTime }) => {
//   const startDateTime = combineDateAndTime(startDate, startTime);
//   const endDateTime = combineDateAndTime(endDate, endTime);
//   const currentDateTime = new Date();

//   return isWithinInterval(currentDateTime, { start: startDateTime, end: endDateTime });
// };