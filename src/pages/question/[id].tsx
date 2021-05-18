import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"
import Link from 'next/link'

import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import { QuestionContext } from "../../context/QuestionContext";
const useStyles = makeStyles({
    pagesCircle: {
        background: 'linear-gradient(270deg, #DB00FF 0%, rgba(132, 0, 255, 0.88) 100%)',
    },
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

    opacity: {
        opacity: 0.6,
    }
})

export default function Question() {
    
    const router = useRouter()

    const classes = useStyles()

    const params = router.query

    const id = Number(params.id)

    const {questions} = useContext(QuestionContext)

    const [question,setQuestion] = useState([])

    async function handleValidationQuestion(values, {resetForm}) {

        if (values.responseQuestion === "") {
            return alert('Please select a question')
        }

        const questionOfStorage = JSON.parse(localStorage.getItem('questions'))
        questionOfStorage[id].selectResponse = values.responseQuestion

        questionOfStorage[id].opts = question
        localStorage.setItem('questions', JSON.stringify(questionOfStorage))
        resetForm({})
        if (id < questions.length - 1) {
            return router.push(`/question/${id + 1}`)
        }

        return router.push('/results')
    }

    useEffect(() => {
        const newQuestions = [...questions[id].incorrect_answers, questions[id].correct_answer]

        function randomArray() {
            newQuestions.sort(()=> Math.random() - 0.5)
        }

        randomArray()

        setQuestion(newQuestions)
    },[questions, id])


    return (
        <Box 
            padding='20px 40px'
            height='100vh'
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
                <Typography>{questions[id].category}</Typography>
                <Box></Box>
            </Box>
            <Container maxWidth="sm">
                <Formik 
                    initialValues={{responseQuestion: ''}}
                    onSubmit={handleValidationQuestion}
                    >
                    {({values})=> (
                        <Form>
                            <Box 
                                marginY='24px'
                                display='flex'
                                justifyContent='center'
                                gridGap='16px'
                                >
                                {questions.map((item, index)=> {
                                    if(index > id -1  && index < id + 5 ) {
                                        return(
                                            <Box 
                                            key={index}
                                            height='50px'
                                            width='50px'
                                            borderRadius='50%'
                                            display='flex'
                                            alignItems='center'
                                            justifyContent='center'
                                            fontWeight={700}
                                            fontSize={24}
                                            border={Number(id) !== index ? '1px solid #FFFFFF' : '' }
                                            className={Number(id) == index ? classes.pagesCircle: ''}
                                            >{index + 1}</Box>
                                            )
                                        }
                                    })}
                            </Box>

                            <Box display='flex' flexDirection='column' alignItems='center'> 
                                <Box 
                                    margin='0 auto'
                                    bgcolor='red'
                                    padding='4px 6px'
                                    borderRadius='8px'
                                    mb='16px'
                                    mt='27px'
                                    >{questions[id].difficulty}</Box>
                                <Typography variant='h6' align='center' dangerouslySetInnerHTML={{__html: questions[id].question}}></Typography>

                                

                                    <Box mt='24px' width='100%'>
                                    {question.map((item,index) => {
                                        return(
                                            <Box 
                                            component='label'
                                            key={index}
                                            height='56px' 
                                            width='100%'
                                            display='flex'
                                            alignItems='center' 
                                            justifyContent='center'
                                            bgcolor='#383D6E'
                                            borderRadius='8px'
                                            className={values.responseQuestion !== item ?( values.responseQuestion === '' ? '' : classes.opacity) : ''}
                                            mb='24px'
                                            >
                                                <Box 
                                                    hidden
                                                    >
                                                    <Field type='radio' name='responseQuestion' value={item}/>
                                                </Box>
                                                <Typography align='center' dangerouslySetInnerHTML={{__html: item}}></Typography>
                                            </Box>
                                            )
                                        })}
                                </Box>
                            </Box>

                            <Button component='button' type='submit' className={classes.button}>Continuar</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Box>
    )
}