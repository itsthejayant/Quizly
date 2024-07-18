'use client'
import React, { useState } from 'react'
import Question from './Question'
import { Button } from '../ui/button';

interface QuestionType {
    question: string;
    options: string[];
    answer: string;
}

interface QuestionListProps {
    questions: QuestionType[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, setQuestions }) => {
    const addQuestionHandler = () => {
        setQuestions((prevState) => [...prevState, {
            question: "",
            options: [""],
            answer: ""
        }]);
    }
    const deleteQuestionHandler = (indexDel: number | undefined) => {
        if (questions.length <= 1) {
            return;
        }
        setQuestions((prevState) => {
            const newarr = prevState.filter((item, index) => {
                if (indexDel !== index) console.log(item, index)
                return indexDel !== index
            });
            // console.log(newarr)
            return newarr;
        })
    }
    return (
        <>
            {
                questions.map((questionObj, index) => {
                    return <Question questionObj={questionObj} key={index}
                        index={index} deleteQuestionHandler={deleteQuestionHandler}
                        questions={questions} setQuestions={setQuestions}
                    />
                })
            }
            <div className='flex justify-end' >
                <Button size='lg' className="button  m-1 border bottom-3" variant={'secondary'} onClick={() => addQuestionHandler()} >
                    ➕ Add Question
                </Button>
            </div>
        </>
    )
}

export default QuestionList