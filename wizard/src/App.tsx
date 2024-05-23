import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { router } from './routes'
import {
  ThemeProvider,
  StyledToastContainer,
} from '@gaia-x-frontend/components-lib'
import { ApiLoader, AppLoader } from './components'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      {/* Fallback is causing issue of page blink  */}
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
