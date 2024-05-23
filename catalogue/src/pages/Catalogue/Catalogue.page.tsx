import { navigationItems } from '@catalogue/constants/base.constants'
import { VITE_BASE_PATH } from '@catalogue/utility/constant'
import { AppBar } from '@gaia-x-frontend/components-lib'
import { Link, NavLink, Outlet } from 'react-router-dom'
import DatacolabLogo from '../../../src/assets/datacolab-logo.svg'

const CataloguePage = () => {
  const NavItem = (
    <>
      {navigationItems.map((navigationItem) =>
        navigationItem.external ? (
          <a
            key={navigationItem.to}
            href={navigationItem.to}
            className="navLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {navigationItem.label}
          </a>
        ) : (
          <NavLink
            key={navigationItem.to}
            to={navigationItem.to}
            className={({ isActive }) =>
              isActive ? 'navLink active' : 'navLink'
            }
          >
            {navigationItem.label}
          </NavLink>
        )
      )}
    </>
  )

  return (
    <div>
      <AppBar headerTabs={NavItem}>
        <Link to={VITE_BASE_PATH}>
          <img
            style={{ padding: '15px 0' }}
            src={DatacolabLogo}
            alt="datacolab logo"
          />
        </Link>
      </AppBar>
      <div className={'h-[calc(100vh-80px)]'}>
        <Outlet />
      </div>
    </div>
  )
}
export default CataloguePage
