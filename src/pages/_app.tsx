import  Head  from 'next/head'

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider, createMuiTheme, makeStyles} from "@material-ui/core"

import { QuestionProvider } from '../context/QuestionContext'


function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0466C9'
      }
    }
  })

  return(
    <QuestionProvider>
      <Head>
        <title>Exemplo</title>
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QuestionProvider>
  ) 
}

export default MyApp
