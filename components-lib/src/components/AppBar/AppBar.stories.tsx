/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react'
import { AppBar } from './AppBar.component'
import BrandLogo from './../../assets/brandLogo.svg'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

const meta = {
  title: 'Naviagation/AppBar',
  component: AppBar,
  tags: ['autodocs'],
} satisfies Meta<typeof AppBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (props) => {
    return (
      <>
        <AppBar
          {...props}
          isAllowProfileMenu={false}
          headerTabs={
            <>
              <li className="navLink">Catalogue</li>
              <li className="navLink">Catalogue</li>
              <li className="navLink active">Catalogue</li>
            </>
          }
        >
          <img src={BrandLogo} alt="gaia-x logo" />
        </AppBar>
      </>
    )
  },

  args: {
    headerTabs: <></>,
  },
}

export const ProfileMenu: Story = {
  render: (props) => {
    return (
      <>
        <AppBar
          {...props}
          isAllowProfileMenu={true}
          headerTabs={
            <>
              <li className="navLink">Catalogue</li>
              <li className="navLink">Catalogue</li>
              <li className="navLink active">Catalogue</li>
            </>
          }
          profileMenuTabs={
            <>
              <a href="#" className="navLink">
                <PersonOutlineIcon /> View profile
              </a>
              <a href="#" className="navLink">
                <LogoutIcon /> Log Out
              </a>
            </>
          }
        >
          <img src={BrandLogo} alt="gaia-x logo" />
        </AppBar>
      </>
    )
  },

  args: {
    headerTabs: <></>,
  },
}
