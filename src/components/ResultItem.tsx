import { Box, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles({
    pagesCircle: {
        background: 'linear-gradient(270deg, #DB00FF 0%, rgba(132, 0, 255, 0.88) 100%)',
    },
    
    opacity: {
        opacity: 0.6,
    },

    correct: {
        background: '#04BF58'
    },

    error: {
        background: '#FF0100'
    }
})

export default function ResultItem({question, key}) {

    const classes = useStyles()

    return (
        <Box display='flex' flexDirection='column' alignItems='center' key={key}>
            <Typography variant='h6' align='center' dangerouslySetInnerHTML={{ __html: question.question }}></Typography>

            <Box mt='24px' width='100%'>
                {question.opts?.map((item, index) => {
                    return (
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
                            className={ question.correctSelect && question.correct_answer === item ? classes.correct : (
                                question.selectResponse === item ? classes.error : classes.opacity
                            )}
                            mb='24px'
                        >
                                <Typography align='center' dangerouslySetInnerHTML={{__html: item}}></Typography>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}