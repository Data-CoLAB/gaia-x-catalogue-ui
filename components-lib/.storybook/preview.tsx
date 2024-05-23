import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeProvider } from './../src/theme'
import { StyledToastContainer } from './../src/components/Alert/Alert.styled'
import 'react-toastify/dist/ReactToastify.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview

export const withMuiTheme = (Story) => (
  <ThemeProvider>
    <StyledToastContainer />
    <Story />
  </ThemeProvider>
)

export const decorators = [withMuiTheme]
