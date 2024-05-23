import {
  StyledToastContainer,
  ThemeProvider,
} from '@gaia-x-frontend/components-lib'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ApiLoader, AppLoader } from './components'
import { router } from './routes'

function App() {
  return (
    <>
      <Suspense fallback={<AppLoader type="linear" />}>
        <ErrorBoundary
          onError={(e: unknown) => {
            console.log('error', e)
          }}
          fallback={
            <div>
              Something just happened. Please reload/refresh the application
            </div>
          }
        >
          <ApiLoader />
          <StyledToastContainer />
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </ErrorBoundary>
      </Suspense>
    </>
  )
}

export default App
