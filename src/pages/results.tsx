import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import ResultItem from "../components/ResultItem";

import Link from 'next/link'

interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    selectResponse: string;
}

const useStyles = makeStyles({
    button: {
        width: '100%',
        height: '56px',
        background: 'linear-gradient(270deg, #DB00FF 0%, #DB00FF 0.01%, rgba(219, 0, 255, 0.95) 43.17%, #8400FF 100%)',
        borderRadius: '8px',
        color: '#FFFFFF',
        fontSize: '20px',
        fontWeight: 'bold',
        letterSpacing: '0.07em',
        margin: 'auto 0 20% 0' 
    },
})


export default function Results() {

    const classes = useStyles()

    const [questions, setQuestions] = useState<Question[]>([] as Question[])

    const [questioncCorrect, setQuestionsCorrect] = useState(0)

    useEffect(()=> {
        const questionInStorage = JSON.parse(localStorage.getItem('questions'))

        const questionsVerify = questionInStorage.map(item => {
            const valid = item.correct_answer === item.selectResponse
            item.correctSelect = valid

            return item
        })


        const acertos = questionsVerify.filter(item => item.correctSelect)

        
        setQuestionsCorrect(acertos.length)
        setQuestions(questionsVerify)
    }, [])
    
    return (
        <Box 
            padding='20px 40px'
            minHeight='100vh'
            bgcolor='#293165'
            color='white'
        >   
            <Box 
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                >
                <Link href='/'>
                    <a>
                        <img src="/back.svg" alt="" />
                    </a>
                </Link>
                <Typography>{`${questioncCorrect}/${questions.length}`}</Typography>
                <Box></Box>
            </Box>
            <Container maxWidth="sm">

                <Box marginY='45px'>
                    {questions.map((question,index)=> {
                        return (
                            <ResultItem key={index} question={question}/>
                            )
                        })}
                </Box>

                <Link href="/">
                    <Button component='a' className={classes.button}>New Play</Button>
                </Link>
            </Container>
        </Box>
    )
}