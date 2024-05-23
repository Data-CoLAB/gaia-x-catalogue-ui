import { ROUTES_CONST } from '@wizard/routes/routes'
import { setToLocalStorage } from '@wizard/utils/helpers'
import { STORAGE } from '@wizard/utils/constants'
import { useAuth } from '@wizard/contexts'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  useEffect(() => {
    if (!auth || !auth.isLoggedIn) {
      setToLocalStorage(
        STORAGE.REDIRECTION_URL,
        `${window.location.origin}/${location.pathname}`
      )
      navigate(`/${ROUTES_CONST.AUTH}`)
    }
  }, [auth, navigate])

  return auth && auth.isLoggedIn ? children : null
}

export { AuthRoute }
