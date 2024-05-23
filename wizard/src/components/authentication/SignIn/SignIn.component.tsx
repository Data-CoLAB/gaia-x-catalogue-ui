import StyledSignIn from './SignIn.module.scss'
import { Button, InputField } from '@gaia-x-frontend/components-lib'
import { checkRegistrationAPI } from '@wizard/api/auth.api'
import { CheckRegistrationRequestParams } from '@wizard/models/check-registration.model'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { Field, Form } from 'react-final-form'
import { getAlert } from '@wizard/hooks/useAlert.hooks'
import { KeyValueType, ValuesType } from '@wizard/models/base.model'
import { ROUTES_CONST } from '@wizard/routes/routes'
import { STORAGE } from '@wizard/utils/constants'
import { useKeycloak } from '@react-keycloak/web'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  emailValidation,
  ValidationCheck,
} from '@wizard/utils/helpers'

const SignIn = () => {
  const { keycloak } = useKeycloak()
  const navigate = useNavigate()

  const validate = (values: KeyValueType) => {
    const params = {
      email: emailValidation(values['email']),
    }
    return ValidationCheck(params as unknown as ValuesType)
  }

  const onSubmit = async (data: KeyValueType) => {
    // Check wether email is already registered
    try {
      const request: CheckRegistrationRequestParams = {
        email: data.email,
      }
      const response = await checkRegistrationAPI(request)
      if (response.payload.userRegistered) {
        try {
          if (response.payload.deviceConfigured) {
            const redirectUri =
              getFromLocalStorage(STORAGE.REDIRECTION_URL) ||
              `${window.location.origin}/${ROUTES_CONST.PRIVATE}/${ROUTES_CONST.SERVICE_MANAGEMENT}`
            removeFromLocalStorage(STORAGE.REDIRECTION_URL)

            await keycloak.login({
              redirectUri: redirectUri,
              loginHint: data.email,
            })
          } else {
            navigate({
              pathname: `/${ROUTES_CONST.EMAIL_VERIFY}`,
              search: createSearchParams({
                email: data.email,
                deviceConfigured: 'false',
              }).toString(),
            })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        getAlert('error', response.message, true, 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className={
          StyledSignIn.SignInContainer +
          ' p-[5rem] relative rounded-[1rem] z-[9] w-[50.6rem]'
        }
      >
        <h2 className="mb-[1rem] text-[3.2rem] font-[600]">Sign In</h2>

        <p
          className={
            StyledSignIn.Content + ' mb-[5rem] text-[1.8rem] font-[300]'
          }
        >
          <p className="mb-[1rem]">New to Gaia X?</p>
          Register your Firm with Gaia - X, Login and start adding Service
          Offering and Resources to the Federated Catalgues. A Registered user
          can Manage Services and Resources and Publish them to Public
          Catalogue.
        </p>

        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="email"
                render={({ input, meta }) => (
                  <InputField
                    {...input}
                    variant="standard"
                    label="Email"
                    fullWidth
                    placeholder="Enter email"
                    error={meta.touched && meta.error}
                    helperText={
                      meta.touched && meta.error && <span>{meta.error}</span>
                    }
                  />
                )}
              />

              <div className="text-right">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className="mt-[2rem]"
                  fullWidth
                >
                  Proceed
                </Button>
              </div>
            </form>
          )}
        />

        <div
          className={
            StyledSignIn.RegisterLink + ' mt-[7.8rem] text-[1.8rem] font-[300]'
          }
        >
          New member? Click here to{' '}
          <Link to={`/${ROUTES_CONST.SIGN_UP}`}>Register</Link>
        </div>
      </div>
    </>
  )
}

export { SignIn }
