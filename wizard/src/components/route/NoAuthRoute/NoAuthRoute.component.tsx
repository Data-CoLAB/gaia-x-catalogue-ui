import { useKeycloak } from '@react-keycloak/web'
import { ROUTES_CONST } from '@wizard/routes/routes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NoAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { keycloak } = useKeycloak()
  const isLoggedIn = keycloak.authenticated
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/${ROUTES_CONST.PRIVATE}/${ROUTES_CONST.SERVICE_MANAGEMENT}`)
    }
  }, [isLoggedIn, navigate])

  return !isLoggedIn ? children : null
}

export { NoAuthRoute }
