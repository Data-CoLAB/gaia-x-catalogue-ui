/* eslint-disable @typescript-eslint/no-misused-promises */
import { resendEmail } from '@wizard/api/auth.api'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EmailConfirmationStyled from './EmailConfirmation.module.scss'

const EmailConfirmation = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState<string>()

  useEffect(() => {
    const emailInUrl = searchParams.get('email')
    const deviceConfiguredInUrl = searchParams.get('deviceConfigured')
    if (!emailInUrl) {
      navigate('/')
    } else {
      setEmail(emailInUrl)
      if (deviceConfiguredInUrl === 'false') {
        const requestBody = { email: emailInUrl }
        resendEmail(requestBody, false, false)
      }
    }
  }, [navigate, searchParams])

  const onResendEmailClick = async () => {
    if (email) {
      const requestBody = { email }
      try {
        await resendEmail(requestBody)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <div
      className={
        EmailConfirmationStyled.EmailConfirmationContainer +
        ' w-[66rem] mt-[30rem] max-2xl:mt-[20rem] rounded-[2rem]'
      }
    >
      <div className={EmailConfirmationStyled.CardLayout + ' p-[0] w-[100%]'}>
        <div
          className={EmailConfirmationStyled.CardLayout__Header + ' p-[2.7rem]'}
        >
          <h2 className="text-[2.4rem] font-[600]">
            Confirm your email address
          </h2>
        </div>

        <p className="mt-[7rem] text-center font-[300] text-[1.8rem]">
          We have sent email to: <b>{email || ''}</b>
        </p>
        <p className="mt-[1.8rem] text-center font-[300] text-[1.8rem]">
          Check your email and click on the confirmation link to continue
        </p>

        <div
          className={
            EmailConfirmationStyled.ProceedLink +
            ' mt-[8.4rem] text-center pb-[5.2rem]'
          }
        >
          <button
            type="button"
            className="bg-transparent text-[1.8rem] text-[#465AFF]"
            onClick={onResendEmailClick}
          >
            Resend email
          </button>
        </div>
      </div>
    </div>
  )
}

export { EmailConfirmation }
