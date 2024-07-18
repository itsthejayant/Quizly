'use client'
import Loader from '@/components/shared/loader/Loader';
import { Button } from '@/components/ui/button';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const QuizPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [isAlert, setIsAlert] = useState(false)
    const { data, status } = useSession();
    const [loading, setLoading] = useState(true)
    const [timeLeft, setTimeLeft] = useState(-10);
    const [answers, setanswers] = useState([])
    const [quizes, setQuizes] = useState(
        [{
            endTime: "12:07",
            negativeMarks: "-1",
            noofQuestions: 7,
            positiveMarks: "10",
            startDate: "2024-07-10T00:00:00.000Z",
            startTime: "20:10",
            timeLimit: 20,
            title: "second quiz",
            id: "wevbkwejvbwkjvwjlvwljnw",
            questions: [{ "question": "namejhbhbbbbbbbbb   ", "options": ["you", "me"], "answer": "1" },
            { "question": "surname", "options": ["suryou", "surme"], "answer": "2" }
                , { "question": "surname", "options": ["suryou", "surme"], "answer": "2" }
                , { "question": "surname", "options": ["suryou", "surme"], "answer": "2" }]
        }]
    )
    // [{ "question": "name", "options": ["you", "me"], "answer": "1" }, { "question": "surname", "options": ["suryou", "surme"], "answer": "2" }]
    interface DateTime {
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
    }
    useEffect(() => {
        if (status === "authenticated") {
            const getQuizes = async () => {
                setLoading(true);
                try {
                    const formdata = {
                        attemptedBy: data?.user?.email,
                        quizId: params.id,
                        startDateTime: (new Date(Date.now()).toISOString()),
                    }
                    console.log("formdata-> ",formdata)

                    const response = await axios.post('/api/startquiz', formdata)
                        // if(response.data.invalid) return router.push('/attemptquiz');
                        // else{
                            console.log("response from server-> ", response.data)
                            console.log("time is",Math.floor(((new Date(response.data.startDateTime).getTime() + response.data?.timeLimit * 60 * 1000) - Date.now()) / 1000))
                            setTimeLeft(Math.floor(((new Date(response.data.startDateTime).getTime() + response.data?.timeLimit * 60 * 1000) - Date.now()) / 1000))

                            // console.log((new Date(response.data.startDateTime).getTime() + response.data?.timeLimit * 60) - Date.now())
                            // setTimeLeft(60)
                            setQuizes(response.data?.questions)
                            setanswers(Array(response.data?.questions.length).fill(-1));
                            // quiz ke questions bhi yehi request layegi
                        // }
                }
                catch (e) {
                    console.log(e)
                }
                finally { setLoading(false) }
            }
            getQuizes();
        }
    }, [status])

    useEffect(() => {
        if (status === "authenticated" && timeLeft >= 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev)=>prev- 1);
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    setIsAlert(true)
                    setTimeLeft(0)
                    submitAnswers();
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    if (status === "loading") {
        return <Loader/>
    }

    if (status === "unauthenticated") {
        return <div className='w-full h-full bg-emerald-200'><div className='text-center pt-7 mx-auto text-red-900'>You need to be authenticated to continue.</div></div>; 
    }
    const handleOptionChange = (e:any) => {
        const { question, option } = e.target.dataset;
        console.log("question index->", question)
        console.log("option index->", option)
        setanswers(prev => {
            const newarr = [...prev];
            newarr[question] = option
            // localStorage.setItem('answers', JSON.stringify(newarr));
            return newarr;
        })
    }
    const submitAnswers = async () => {
        try {
            setLoading(true)
            const formdata = {
                answers: answers,
                attemptedBy: data?.user?.email,
                quizId: params.id
            }
            const response = await axios.post('/api/submitquiz', formdata)
            if (!response.data.success) alert('error')
        }
        catch (e) {
            console.log(e)
        }
        finally{ setLoading(false)}
    }
    const submitQuiz=()=>{
        setIsAlert(true)
        setTimeLeft(0)
        submitAnswers();
    }
    // const combineDateAndTime = (date:any, time:any) => {
    //     return new Date(`${date.split('T')[0]}T${time}:00Z`);
    // };

    // const isCurrentTimeBetween = ({ startDate, startTime, endDate, endTime }: DateTime) => {
    //     const startDateTime = combineDateAndTime(startDate, startTime);
    //     const endDateTime = combineDateAndTime(endDate, endTime);
    //     const currentDateTime = new Date();

    //     return currentDateTime >= startDateTime && currentDateTime <= endDateTime;
    // };
    return (
        <div className='bg-slate-200 w-full h-full  grid grid-cols-4 gap-x-1 pt-2  '>
            {
                loading ? <Loader/>
                    :
                    (<>
                        <div className='col-span-1  pl-2 fixed w-1/4  '>
                            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                            <div className='flex flex-wrap gap-2 p-2 bg-slate-300 h-fit w-full '>
                                {
                                    Array(quizes.length).fill(0).map((item, index) =>
                                        <a href={`#target-${index}`} key={index}>
                                            <div className='p-4 bg-slate-400 h-fit w-fit hover:bg-slate-500'>{index + 1}</div>
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                        <div className='col-start-2 col-span-3 flex flex-col  '>
                            {
                                quizes.map((question, index) => {
                                    return <div className='bg-sky-200 border border-3 rounded-md p-1 m-3 ' id={`target-${index}`} key={index} >
                                        <p className='text-wrap break-words'>{index + 1}. {question.question}</p>
                                        <div className='px-4'>
                                            {
                                                question.options.map((option, ind) => {
                                                    return <div key={ind} className='mb-1 '>
                                                        <label>
                                                            <input type="radio" name={`options${index + 1}`} data-option={ind} data-question={index}
                                                                className="shadow border rounded  p-1 m-1" onChange={handleOptionChange} />
                                                            {option}
                                                        </label>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                })
                            }
                            <Button className='w-1/3 mx-auto' onClick={()=> submitQuiz()} >Submit</Button>
                        </div>
                    </>)
            }
            {
                isAlert &&
                <div className='h-screen w-screen bg-opacity-70 bg-black z-40 fixed top-0 left-0' >
                        {/* style={{ 'backdrop-filter': 'blur(5px);' }} */}
                    <div className='w-1/3 text-center bg-black  border border-1 border-white shadow-2xl  shadow-black z-50 fixed top-1/3 left-1/3 py-4' >
                        <h1 className=' text-white p-3' >Thank you for participating</h1>
                        {/* <p className=' text-red-700 p-1 font-bold text-sm'> You can view your score in profile section</p> */}
                        <div className='flex justify-evenly m-2' >
                            <Button size={'lg'} disabled={loading} onClick={()=>router.push('/profile')} > 
                                {loading ? "Processing for submission" : "View Score"}
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default QuizPage