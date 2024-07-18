'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

const Dashboard = () => {
    const { data, status } = useSession();

    return (
        <div className='bg-slate-100 h-full'>
            <div className="bg-slate-200 text-center text-3xl p-3 text-fuchsia-950 font-light" >
                Hosted Quiz Stats
            </div >

        </div>
    )
}

export default Dashboard;