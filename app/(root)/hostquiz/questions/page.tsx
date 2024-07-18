'use client'
import QuestionList from '@/components/shared/QuestionList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const HostQuiz = () => {
    const router = useRouter();
    const { status } = useSession();
    const [isFilled, setisFilled] = useState("")
    const [quizinfo, setQuizInfo] = useState({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        timeLimit: "",
        positiveMarks: "",
        negativeMarks: "",
    })
    interface QuestionType {
        question: string;
        options: string[];
        answer: string;
    }
    const [questions, setQuestions] = useState<QuestionType[]>([{
        question: "",
        options: [""],
        answer: ""
    },]);
    useEffect(() => {
        const storedQuestions = localStorage.getItem('Questions');
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        }
    }, []);
    if (status === "unauthenticated") {
        return <div className='w-full h-full bg-emerald-200'><div className='text-center pt-7 mx-auto text-red-900'>You need to be authenticated to view this page.</div></div>;
    }
    const handleQuizInfo = (e: any) => {
        setQuizInfo({
            ...quizinfo,
            [e.target.name]: e.target.value
        });
    }
    const combineDateAndTime = (date: any, time: any) => {
        return new Date(`${date}T${time}`);
    };

    const isStartBeforeEnd = () => {
        const startDateTime = combineDateAndTime(quizinfo.startDate, quizinfo.startTime);
        const endDateTime = combineDateAndTime(quizinfo.endDate, quizinfo.endTime);
        return startDateTime < endDateTime;
    };
    const isQuizInfoComplete = () => {
        return Object.entries(quizinfo).every(([key, value]) => {
            if (value === "") {
                return false;
            }
            return true;
        });
    };
    const areQuestionsComplete = () => {
        return questions.every(question => {
            return question.question !== "" &&
                question.answer !== "" &&
                question.options.every(option => option !== "");
        });
    };
    const nextHandler = () => {
        if (!isQuizInfoComplete()) {
            setisFilled("Quiz Info is not complete")
            return;
        }
        else if (!isStartBeforeEnd()) {
            setisFilled("End date and time should be less than start date and time")
            return;
        }
        else if (!areQuestionsComplete()) {
            setisFilled("Questions have empty feilds")
            return;
        }

        localStorage.setItem('QuizInfo', JSON.stringify(quizinfo))
        localStorage.setItem('Questions', JSON.stringify(questions))

        router.push('/hostquiz/addusers')
    }
    // [{"question":"name","options":["you","me"],"answer":"1"},{"question":"surname","options":["suryou","surme"],"answer":"2"}]
    // {"title":"first quiz","startDate":"2024-07-10","endDate":"2024-07-11","startTime":"20:10","endTime":"12:07","timeLimit":"20","positiveMarks":"2","negativeMarks":"-1"}
    return (
        <div className='bg-emerald-200 w-full h-full'>
            <h1 className='flex justify-evenly text-3xl pt-3 text-teal-900 font-semibold font-sans'>Create Quiz in 2 easy steps</h1>
            <div className='m-auto w-2/3 mt-3 border border-3 rounded-md border-green-700 p-2 hover:shadow-lg '>
                <p className='text-base text-teal-900 font-semibold font-sans my-1'>Quiz title:<span className='text-red-800'>{'  *'}</span> </p>
                <input name='title' onChange={(e) => handleQuizInfo(e)} placeholder='title here...' className='shadow appearance-none border w-full rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' />
                <br />
                <p className='text-base text-teal-900 font-semibold font-sans my-1'>Quiz start date and time:<span className='text-red-800'>{'  *'}</span> </p>
                <input type='date' name='startDate' onChange={(e) => handleQuizInfo(e)} className='shadow appearance-none border w-fit m-1 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' />
                <input type='time' name='startTime' onChange={(e) => handleQuizInfo(e)} className='shadow appearance-none border w-fit m-1 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' /><br />
                <p className='text-base text-teal-900 font-semibold font-sans my-1'>Quiz end date and time:<span className='text-red-800'>{'  *'}</span></p>
                <input type='date' name='endDate' onChange={(e) => handleQuizInfo(e)} className='shadow appearance-none border w-fit m-1 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' />
                <input type='time' name='endTime' onChange={(e) => handleQuizInfo(e)} className='shadow appearance-none border w-fit m-1 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' /><br />
                <span className='text-base text-teal-900 font-semibold font-sans my-1'>{'Time limit (in minutes): '}<span className='text-red-800'>{'  *'}</span></span>
                <input type='number' name='timeLimit' onChange={(e) => handleQuizInfo(e)} className='shadow appearance-none border w-fit m-1 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' /><br />
                <span className='text-base text-teal-900 font-semibold font-sans my-1'>Positive marks for correct answers:<span className='text-red-800'>{'  *'}</span> </span>
                <input type='number' name='positiveMarks' onChange={(e) => handleQuizInfo(e)} className='shadow appearance-none border w-fit m-1 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' /><br />
                <span className='text-base text-teal-900 font-semibold font-sans my-1'>Negative marks for incorrect answers: <span className='text-red-800'>{'  *'}</span></span>
                <input type='number' name='negativeMarks' onChange={(e) => handleQuizInfo(e)} className='shadow appearance-none border w-fit m-1 rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none' />
            </div>
            <div className='m-auto w-2/3 mt-3 border border-3 rounded-md border-green-700 p-2 hover:shadow-lg'>
                <h1 className='text-2xl text-teal-900 font-semibold font-sans my-1'>Define questions</h1>
                <QuestionList setQuestions={setQuestions} questions={questions} />
                {
                    isFilled !== "" && <div className='text-red-800 text-base text-center'>*{isFilled}*</div>
                }
                <Button className='button w-full my-1' onClick={() => nextHandler()}>
                    {' Next -> add participants'}
                </Button>
            </div>
        </div>
    )
}


export default HostQuiz