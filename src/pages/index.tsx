import { Box, Button, makeStyles } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { QuestionContext } from "../context/QuestionContext";

const useStyles = makeStyles({
  root: {
    backgroundColor: '#293165',
    height: '100vh',
    width: '100vw',
    boxSizing: 'border-box',
    display: 'flex',
    color: "#FFF",
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },

  content: {
    width: '100%',
  },

  buttonGradient: {
    background: "linear-gradient(90deg, #DB00FF 0%, rgba(132, 0, 255, 0.88) 100%)",
    borderRadius: '8px',
    width: '58px',
    height: '58px',
    fontSize: '0',
  },

  currentQuestions: {
    backgroundColor: '#FFF',
    height: '58px',
    width: '114px',
    color: '#4D8CE0',
  },

  buttonRight: {
    width: '136px',
    height: '56px',

    color: '#FFFFFF',
    boxShadow: 'none'
  }
})

export default function Home() {

  const {countQuestion, updateCountQuestion, handleGetQuestion} = useContext(QuestionContext)
  
  useEffect(() => {
    updateCountQuestion(0)
  }, [])

  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Box className={classes.container}>
          <Box 
            component='h2'
            fontSize="26px"
            fontWeight="600"
            maxWidth="272px"
            textAlign="center"
          >Vamos testar seus conhecimentos?</Box>

          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            marginTop="85px"
            marginBottom="120px"
          >
            <Box 
              component='h4' 
              fontSize="h6.fontSize" 
              fontWeight="400"
            >Quantas perguntas gostaria?</Box>

            <Box display='flex' width="100%" flexDirection="row" gridGap='30px' marginTop="24px">
              <Button 
                className={classes.buttonGradient}
                onClick={()=> updateCountQuestion(countQuestion - 1)}
              >
                <img src="/negative.svg" alt="" />
              </Button>
              <Box 
                display='flex'
                alignItems="center"
                justifyContent="center"
                borderRadius='8px'
                className={classes.currentQuestions}>
                <Box 
                  component='p' 
                  fontWeight="bold"
                  fontSize="26px"
                >{countQuestion}</Box>
              </Box>
              <Button 
                className={classes.buttonGradient}
                onClick={()=> updateCountQuestion(countQuestion + 1)}
              >
                <img src="/plus.svg" alt="" />
              </Button>
            </Box>
          </Box>

          <Button 
            className={classes.buttonRight} 
            variant="contained" 
            color="primary"
            onClick={handleGetQuestion}
          >Pronto</Button>
        </Box>
      </div>
  )
}
