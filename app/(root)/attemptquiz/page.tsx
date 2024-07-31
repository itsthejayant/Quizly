'use client'
import Loader from '@/components/shared/loader/Loader';
import { Button } from '@/components/ui/button';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AttemptQuiz = () => {
    const router = useRouter()
    const { data, status } = useSession();
    const [isAlert, setIsAlert] = useState(false)
    const [quizId, setquizId] = useState("")
    const [loading, setLoading] = useState(true)
    const [quizes, setQuizes] = useState([
        // {
        //     endTime: "12:07",
        //     negativeMarks: "-1",
        //     noofQuestions: 2,
        //     positiveMarks: "2",
        //     startDate: "2024-07-10T00:00:00.000Z",
        //     startTime: "20:10",
        //     timeLimit: 20,
        //     title: "second quiz",
        //     id: "wevbkwejvbwkjvwjlvwljnw"
        // },
        // {
        //     endTime: "12:07",
        //     negativeMarks: "-1",
        //     noofQuestions: 2,
        //     positiveMarks: "2",
        //     startDate: "2024-07-10T00:00:00.000Z",
        //     startTime: "20:10",
        //     timeLimit: 20,
        //     title: "second quiz",
        //     id: "23456789lvwljnw"
        // },
    ])
    interface Quiz {
        id: string;
        title: string;
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
        timeLimit: number;
        noofQuestions: number;
        positiveMarks: number;
        negativeMarks: number;
        isAttempted: boolean;
    }
    interface DateTime {
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
    }
    useEffect(() => {
        if (status === "authenticated") {
            const getQuizes = async () => {
                // setLoading(true);
                try {
                    const response = await axios.get('/api/quiz', {
                        params: { email: data?.user?.email }
                    })
                    // console.log(response.data)
                    setQuizes(response.data)
                }
                catch (e) {
                    console.log("error jaynt", e)
                }
                finally { setLoading(false) }
            }
            getQuizes();
        }

    }, [status])

    const combineDateAndTime = (date: any, time: any) => {
        return new Date(`${date.split('T')[0]}T${time}:00`);
    };

    const isCurrentTimeBetween = ({ startDate, startTime, endDate, endTime }: DateTime) => {
        const startDateTime = combineDateAndTime(startDate, startTime);
        const endDateTime = combineDateAndTime(endDate, endTime);
        const currentDateTime = new Date();
        return currentDateTime >= startDateTime && currentDateTime <= endDateTime;
    };
    if (status === "unauthenticated") {
        return <div className='w-full h-full bg-emerald-200'><div className='text-center pt-7 mx-auto text-red-900'>You need to be authenticated to view this page.</div></div>;
    }

    const handleClick = async () => {
        try {
            const formdata = {
                attemptedBy: data?.user?.email,
                quizId: quizId,
                startDateTime: Date.now(),
            }
            console.log(formdata)
            router.push(`/attemptquiz/${quizId}`)
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='bg-emerald-200 w-full h-full'>
            <h1 className='flex justify-evenly text-3xl pt-3 text-teal-900 font-semibold font-sans'>Your Scheduled Quizes</h1>
            <div className='m-auto w-3/4 mt-3 rounded-md border-green-700 p-5 flex justify-evenly flex-wrap gap-x-2 gap-y-5'>
                {
                    loading ? <Loader />
                        :
                        (quizes.length == 0 ? <p>No upcoming quizes for you...</p>
                            :
                            (quizes.map((quiz: Quiz, index: number) => {   //basis-1/3
                                return <div key={index} className='text-red-500 font-medium bg-gradient-to-b from-cyan-300 to-blue-300 border-4 transition ease-in-out duration-400  hover:scale-110 drop-shadow-xl p-3 ' >
                                    <h1 className='text-center text-2xl p-2 text-violet-900 font-semibold'>{quiz?.title.toUpperCase()}</h1>
                                    <p>From: {quiz?.startDate.split('T')[0]}, {quiz?.startTime} </p>
                                    <p>To: {quiz?.endDate.split('T')[0]}, {quiz?.endTime}  </p>
                                    <p>Time: {quiz?.timeLimit} mins </p>
                                    <p>Questions: {quiz?.noofQuestions}  </p>
                                    <p>Correct marks: {quiz?.positiveMarks}  </p>
                                    <p>Incorrecct marks: {quiz?.negativeMarks}  </p>
                                    <div className='flex justify-center my-1'>
                                        <Button onClick={() => { setIsAlert(true); setquizId(quiz?.id) }}
                                            disabled={!isCurrentTimeBetween({ startDate: quiz?.startDate, startTime: quiz?.startTime, endDate: quiz?.endDate, endTime: quiz?.endTime }) || quiz?.isAttempted} >
                                            {quiz?.isAttempted ? 'Attempted' : 'Attempt Quiz'}
                                        </Button>
                                    </div>
                                </div>
                            })))
                }
            </div>
            {
                isAlert &&
                <div className='h-screen w-screen bg-opacity-90  bg-black z-40 fixed top-0 left-0' >
                    {/* style={{ 'backdrop-filter': 'blur(5px);' }} */}
                    <div className='w-1/3 text-center bg-white bg-opacity-95  border border-1 border-white rounded-lg shadow-2xl  shadow-black z-50 fixed top-1/3 left-1/3 py-4' >
                        <h1 className=' text-black p-3 font-semibold' >You are about to begin the quiz.<br /> Are you sure?</h1>
                        <p className=' text-red-700 p-1 text-sm font-semibold'> Quiz once started cannot be stopped in middle</p>
                        <div className='flex justify-evenly m-2' >
                            <Button variant={'outline'} onClick={() => setIsAlert(false)}>Cancel</Button>
                            <Button size={'lg'} onClick={() => handleClick()} >Start</Button>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default AttemptQuiz