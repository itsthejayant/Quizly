'use client'
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddUsers = () => {
    const router = useRouter();
    const [emails, setEmails] = useState([]);
    // const [emails, setEmails] = useState(['d', 's', 'a']);
    const [query, setQuery] = useState<string>("");
    const [hostButton, setHostButton] = useState("Host Quiz🎉")
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setEmails(response.data)
            } catch (err) {
                console.log('Error fetching users');
            }
        };
        fetchUsers();
        // const emails = localStorage.getItem('selectedEmails');
        // if (emails) {
        //     setSelectedEmails(JSON.parse(emails));
        // }
    }, [])

    const addEmailHandler = () => {
        if (emails.includes(query) && !selectedEmails.includes(query)) {
            setSelectedEmails([...selectedEmails, query])
            setQuery("")
            localStorage.setItem('selectedEmails', JSON.stringify([...selectedEmails, query]))
        }
        else {
            toast('Not a registered email', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            if (emails.includes(query) && !selectedEmails.includes(query)) {
                setSelectedEmails([...selectedEmails, query])
                setQuery("")
            }
            else {
                toast('Not a registered email', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    };
    const handlehostQuiz = async () => {
        setIsDisabled(true)
        setHostButton("hosting")
        const formData = {
            quizInfo: JSON.parse(localStorage.getItem('QuizInfo') || "null"),
            questions: JSON.parse(localStorage.getItem('Questions') || "null"),
            // emails: JSON.parse(localStorage.getItem('selectedEmails') || "null")
            emails: selectedEmails
        }
        localStorage.removeItem('QuizInfo');
        localStorage.removeItem('Questions')
        console.log("quizdata ->",formData)
        try {
            const response = await axios.post('/api/quiz', formData);
            if (response.data.message === 'Done') {
                setHostButton('Quiz Hosted Successfully 🎉')
            }
        }
        catch (e) {
            console.log("host quiz submission error", e)
            setHostButton('Hosting Failed, try again later')
        }
    }
    return (
        <div className='bg-emerald-200 w-full h-full'>
            <Button className="button border bottom-3 m-2" variant='secondary' onClick={() => router.back()}>
                🔙
            </Button>
            <h1 className='flex justify-evenly text-3xl pt-3 text-teal-900 font-semibold font-sans'>Add Participants</h1>
            <div className='m-auto w-2/3 mt-3 border border-3 rounded-md border-green-700 p-2'>
                <h1 className='text-2xl text-teal-900 font-semibold font-sans my-1'>Select participants registered email</h1>
                <input type='email' placeholder='Search email' value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}
                    className="shadow appearance-none border rounded w-2/3 p-1 bg-cyan-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <Button size='sm' className="button border bottom-3 mx-4" variant='secondary' onClick={() => addEmailHandler()}>
                    ➕ Add
                </Button>
                {
                    selectedEmails.map((item, index) => {
                        return <div key={index} className='' >{index + 1}. {item}</div>;
                    })
                }
                {
                    selectedEmails.length > 0 &&
                    <Button size='lg' className="my-1 w-full button2 border mt-2 text-8xl" onClick={handlehostQuiz} disabled={isDisabled} >
                        {hostButton}
                    </Button>
                }
            </div>

        </div>
    )
}

export default AddUsers