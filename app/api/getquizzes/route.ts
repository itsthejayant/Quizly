import { NextResponse } from 'next/server';
import { connectToDb } from "../../../lib/services/db"
import Quiz from '../../../lib/models/quiz';
import User from '../../../lib/models/user';
import Scores from '@/lib/models/scores';

export async function GET(req: Request){
    try{
        const {searchParams} = new URL(req.url);
        const email = searchParams.get('email');
        if (!email) {
            return NextResponse.json({ message: 'Email query parameter is required' }, { status: 400 });
        }
        await connectToDb();
        const quizzes = await Scores.find({ attemptedBy: email });
        return NextResponse.json(quizzes);
    }
    catch(e){
        console.log("server fetch quizes for user error",e);
        return Response.error()
    }
}
