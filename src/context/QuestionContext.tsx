import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import {useRouter} from 'next/router'

interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface QuestionContextData {
    countQuestion: number;
    updateCountQuestion: (count) => void;
    questions: Question[];
    handleGetQuestion: () => void;
    handleSaveQuestionsInStorage: ()=> void;
}

interface QuestionContextProps {
    children: ReactNode
}

export const QuestionContext = createContext({} as QuestionContextData)

export function QuestionProvider({children}: QuestionContextProps) {

    const router = useRouter()

    const [countQuestion, setCountQuestion] = useState(0)
    const [questions, setQuestions] = useState<Question[]>([])


    function updateCountQuestion(count){
        if(count < 0) {
            return
        }
        setCountQuestion(count)
    }

    function handleSaveQuestionsInStorage() {
        localStorage.setItem('questions', JSON.stringify(questions))
    }

    async function handleGetQuestion() {

        if(countQuestion === 0) {
            return alert('Please inform the number of questions')
        }

        const {data} = await api.get(`api.php?amount=${countQuestion}`)
        setQuestions(data.results)

        router.push('/confirm')

    }

    return (
        <QuestionContext.Provider value={{
            countQuestion,
            questions,
            updateCountQuestion,
            handleGetQuestion,
            handleSaveQuestionsInStorage
        }}>
            {children}
        </QuestionContext.Provider>
    )
}