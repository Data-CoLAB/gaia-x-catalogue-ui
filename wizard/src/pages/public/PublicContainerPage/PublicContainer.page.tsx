import BrandLogo from '../../../assets/brandLogo2.svg'
import { AddMoreIcon, AppBar } from '@gaia-x-frontend/components-lib'
import { CATALOGUE_URL } from '@wizard/utils/constants'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { ROUTES_CONST } from '@wizard/routes/routes'

const PublicContainer = () => {
  const navigationItems = [
    {
      to: CATALOGUE_URL,
      label: 'Catalogue',
      external: true,
      icon: AddMoreIcon,
    },
    {
      to: ROUTES_CONST.PUBLIC_SERVICE_OFFERING_CREATE,
      label: 'Services',
      icon: AddMoreIcon,
    },
    {
      to: ROUTES_CONST.PUBLIC_RESOURCE_CREATE,
      label: 'Resource',
      icon: AddMoreIcon,
    },
  ]
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
              isActive ? ' navLink active' : 'navLink'
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
        <Link to={'/'}>
          <img src={BrandLogo} alt="gaia-x logo" />
        </Link>
      </AppBar>
      <Outlet />
    </div>
  )
}

export default PublicContainer
