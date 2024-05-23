import { createTheme } from '@mui/material/styles'
import { color } from './colors'
import { typography } from './typography'

const theme = createTheme({
  palette: color,
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '10px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
  },
})

export { theme }
