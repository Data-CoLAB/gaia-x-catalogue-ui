import { ROUTES_CONST } from '@wizard/routes/routes'
import { setToLocalStorage } from '@wizard/utils/helpers'
import { INITIAL_USER_CONFIG, STORAGE } from '@wizard/utils/constants'
import { useAuth } from '@wizard/contexts'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ParticipantRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  useEffect(() => {
    if (auth && auth.isLoggedIn) {
      if (
        auth.userConfig !== INITIAL_USER_CONFIG &&
        !auth.userConfig.legalParticipantUrl
      ) {
        navigate(`/${ROUTES_CONST.BECOME_PARTICIPANT}`)
      }
    } else {
      setToLocalStorage(
        STORAGE.REDIRECTION_URL,
        `${window.location.origin}/${location.pathname}`
      )
      navigate(`/${ROUTES_CONST.AUTH}`)
    }
  }, [auth, navigate])

  return auth && auth.userConfig && auth.userConfig.legalParticipantUrl
    ? children
    : null
}

export { ParticipantRoute }
