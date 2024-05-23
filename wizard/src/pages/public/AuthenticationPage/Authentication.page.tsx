import { useState } from 'react'
import { CustomTabs } from '@gaia-x-frontend/components-lib'
import { SignIn, WithoutSignIn } from '@wizard/components'
import { AuthenticationTab } from './Authentication.constants'
import GaiaXLogo from '../../../assets/Gaia-X-Logo.png'
import StyledAuth from './Authentication.module.scss'

const AuthenticationPage = () => {
  const [selectedTab, setSelectedTab] = useState<AuthenticationTab>(
    AuthenticationTab.SignIn
  )

  return (
    <>
      <div
        className={
          StyledAuth.LoginContainer +
          ' h-[100vh] w-[100%] flex items-center gap-[20%] justify-center'
        }
      >
        <div>
          <img className="relative" src={GaiaXLogo} alt="" />
        </div>

        <div className={StyledAuth.AuthScreen}>
          <CustomTabs
            items={['Sign In', 'Without Sign In']}
            onChangeTab={(e: number) => setSelectedTab(e)}
          />

          <div className="mt-[2.6rem]">
            {selectedTab === AuthenticationTab.SignIn ? (
              <SignIn />
            ) : (
              <WithoutSignIn />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthenticationPage
