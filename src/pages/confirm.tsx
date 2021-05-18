import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import Link from 'next/link'
import { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";
const useStyles = makeStyles({
    button: {
        width: '341px',
        height: '56px',
        background: 'linear-gradient(270deg, #DB00FF 0%, #DB00FF 0.01%, rgba(219, 0, 255, 0.95) 43.17%, #8400FF 100%)',
        borderRadius: '8px',
        color: '#FFFFFF',
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '0.07em'
    },
    buttonCancel: {
        width: '341px',
        height: '56px',
        marginTop: '24px',
        color: '#FFFFFF',
        textDecoration: 'underline',
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '0.07em'
    }
})
export default function Confirm() {
    const classes = useStyles()

    const {handleSaveQuestionsInStorage, updateCountQuestion} = useContext(QuestionContext)
    return(
        <Box 
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='100vh'
            bgcolor='#293165'
            color="white"
        >
            <Box 
                marginBottom="65px"
            >
                <Typography variant="h4" component="h2">Vamos começar?</Typography>
            </Box>
            <Link href="/question/0">
                <Button onClick={handleSaveQuestionsInStorage} className={classes.button}>Play</Button>
            </Link>
            <Link href='/'>
                <Button onClick={()=> updateCountQuestion(0)} component="a" className={classes.buttonCancel}>Cancel</Button>
            </Link>
        </Box>
    )
}