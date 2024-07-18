'use client'
import Loader from '@/components/shared/loader/Loader';
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const { data, status } = useSession();
    const [loading, setloading] = useState(true)
    const [quizzes, setquizzes] = useState([{
        title: "ewwrb",
        score: "312",
        correct: "22"
    },
    {
        title: "ewwrb",
        score: "312",
        correct: "22"
    },
    {
        title: "ewwrb",
        score: "312",
        correct: "22"
    },
    {
        title: "ewwrb",
        score: "312",
        correct: "22"
    },
    ])
    useEffect(() => {
        if (status == 'authenticated') {
            const getdata = async () => {
                try {
                    const response = await axios.get('/api/getquizzes', {
                        params: { email: data?.user?.email }
                    });
                    setquizzes(response.data);
                }
                catch (e) {
                    console.log(e)
                }
                finally { setloading(false) }
            }
            getdata();
        }
    }, [status])

    return (
        <div className='bg-slate-100 h-full'>
            <div className="bg-slate-200 bg-dotted-pattern bg-contain py-5 md:py-0" >
                <div className="wrapper flex justify-around " >
                    <Image src={data?.user?.image || ""} width={150} height={150} alt={'img.png'} className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]" />
                    <div className="flex flex-col justify-center gap-8 w-1/3" >
                        <h1 className="h2-medium" >{data?.user?.name}</h1>
                        <p className='p-regular-20 md:p-regular-24'>{data?.user?.email}
                        </p>
                    </div>
                </div>
            </div >
            <div className="bg-slate-100 " >
                <h1 className='text-center p-2 text-3xl font-mono text-green-800' >Quiz Undertaken</h1>
                {
                    loading ? <Loader />
                        :
                        (
                            <table className="m-auto bg-emerald-50 w-11/12 text-center border-collapse border border-slate-500">
                                <thead>
                                    <tr>
                                        <th className='border border-slate-600 p-2'>S.No</th>
                                        <th className='border border-slate-600 p-2'>Title</th>
                                        <th className='border border-slate-600 p-2'>Correct Answers</th>
                                        <th className='border border-slate-600 p-2'>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        quizzes.length == 0 ? <tr><td className='text-center' colSpan={4} >No quizzes found</td></tr>
                                            :
                                            quizzes.map((ele, index) => {
                                                return <tr key={index}>
                                                    <td className='border border-slate-600 p-1'>{index + 1}</td>
                                                    <td className='border border-slate-600 p-1'>{ele.title}</td>
                                                    <td className='border border-slate-600 p-1'>{ele.correct}</td>
                                                    <td className='border border-slate-600 p-1'>{ele.score}</td>
                                                </tr>
                                            })
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
        </div>
    )
}

export default Profile;