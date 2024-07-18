import React from 'react'
import { Button } from '../ui/button';

interface QuestionProps {
    questionObj: {
        question: string;
        options: string[];
        answer: string;
    };
    index: number;
    deleteQuestionHandler: (index: number | undefined) => void;
    questions: {
        question: string;
        options: string[];
        answer: string;
    }[];
    setQuestions: React.Dispatch<React.SetStateAction<{
        question: string;
        options: string[];
        answer: string;
    }[]>>;
}
const Question: React.FC<QuestionProps> = ({ questionObj, index, deleteQuestionHandler, setQuestions, questions }) => {
    const addOptionHandler = () => {
        if (questions[index].options)
            setQuestions(prevState => {
                const updatedQuestions = [...prevState];
                updatedQuestions[index] = {
                    ...updatedQuestions[index],
                    options: [...updatedQuestions[index].options, ""]
                };
                // console.log("Updated Questions:", updatedQuestions);
                return updatedQuestions;
            });
        // setQuestions((prev)=>{
        //     const newarr = [...prev]
        //     const newOptions = [...newarr[index].options,""];
        //     const updatedQuestion = { ...newarr[index], options: newOptions};
        //     newarr[index] = updatedQuestion;
        //     return newarr;
        // })
        // niche wla nahi chalega
        // setQuestions(prevState => {
        //     const updatedQuestions = [...prevState];
        //     updatedQuestions[index].options = [
        //         ...updatedQuestions[index].options, ""];
        //     console.log("new ",updatedQuestions)
        //     return updatedQuestions;
        // });
    }
    const deleteOptionHandler = (optionIndex: number) => {
        setQuestions((prevState) => {
            const updatedQuestions = [...prevState];
            const newOptions = updatedQuestions[index].options.filter((q, indk) => optionIndex !== indk)
            updatedQuestions[index] = { ...updatedQuestions[index], options: newOptions }
            return updatedQuestions;
        })
    }
    const handleChange = (e: any) => {
        setQuestions((prevState) => {
            const newarr = [...prevState]
            newarr[index].question = e.target.value;
            // console.log(newarr)
            return newarr;
        })
    }
    const handleOptionChange = (e: any, optionInd: number) => {
        setQuestions((prevState) => {
            const newarr = [...prevState]
            newarr[index].options[optionInd] = e.target.value;
            // console.log(newarr)
            return newarr;
        })
    }
    const answerHandler = (e: any) => {
        setQuestions((prevState) => {
            const newarr = [...prevState]
            newarr[index].answer = e.target.value;
            return newarr;
        })
    }
    return (
        <div className='border border-3 rounded-md border-teal-700 p-1 mb-3'>
            <div className='flex justify-between mb-1'>
                <p>Multiple choice Question {index + 1} {index === 0 && <span className='text-red-800'>*</span>}</p>
                {index !== 0 && <p className='cursor-pointer' onClick={() => deleteQuestionHandler(index)} >❌</p>}
            </div>
            {/* <input placeholder='question here' className='w-2/3' /> */}
            <textarea
                id="multiLineInput"
                // value={inputValue}
                onChange={(e) => handleChange(e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                placeholder="Enter your Question here..."
                value={questions[index].question}
                rows={2}
                style={{ overflow: 'auto', height: '3rem' }}
            ></textarea>
            <div className='px-4'>
                {
                    questions[index].options.map((option, ind) => {
                        return <div key={ind} className='mb-1 flex justify-between'>
                            <p>{ind + 1}{'. '}
                                <input type="text" id="option1" name="options" placeholder={`Option ${ind + 1} here`} onChange={(e) => handleOptionChange(e, ind)}
                                    value={questions[index].options[ind]}
                                    className="shadow appearance-none border rounded  p-1 bg-cyan-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />{ind === 0 && <span className='text-red-800'>{'  *'}</span>}
                            </p>
                            {ind !== 0 && <p className='cursor-pointer' onClick={() => deleteOptionHandler(ind)} >❌</p>}
                        </div>
                    })
                }
            </div>
            <div className='flex justify-between' >
                <label>{'Option number of answer ->'}
                    <input type='number' placeholder='Option number' onChange={(e) => answerHandler(e)}
                        className="shadow appearance-none border rounded  p-1 bg-cyan-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    /><span className='text-red-800'>{' *'}</span>
                </label>
                <Button size='sm' className="button border bottom-3" variant='secondary' onClick={() => addOptionHandler()}>
                    ➕ Add Option
                </Button>
            </div>
        </div>
    )
}

export default Question