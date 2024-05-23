import { Button } from '@gaia-x-frontend/components-lib'
import StyledWithoutSignIn from './WithoutSignIn.module.scss'
import { useNavigate } from 'react-router-dom'
import { ROUTES_CONST } from '@wizard/routes/routes'

const WithoutSignIn = () => {
  const navigate = useNavigate()

  return (
    <div
      className={
        StyledWithoutSignIn.WithoutSignInContainer +
        ' p-[5rem] relative rounded-[1rem] z-[9] w-[50.6rem]'
      }
    >
      <h2 className="mb-[2rem] text-[3.2rem] font-[600]">Without Sign In</h2>

      <p className="text-[1.8rem] font-[300]">
        Gaia-X standard services can be used without registration and login.
        Select this option to Create Service Offering or Resource using your GX
        Compliant Credentials and Private Key
      </p>

      <div className="mt-[15rem] flex flex-col text-center gap-[2rem]">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(
              `/${ROUTES_CONST.PUBLIC}/${ROUTES_CONST.PUBLIC_RESOURCE_CREATE}`
            )
          }}
        >
          Create resource
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate(
              `/${ROUTES_CONST.PUBLIC}/${ROUTES_CONST.PUBLIC_SERVICE_OFFERING_CREATE}`
            )
          }}
        >
          Create service offering
        </Button>
      </div>
    </div>
  )
}

export { WithoutSignIn }
