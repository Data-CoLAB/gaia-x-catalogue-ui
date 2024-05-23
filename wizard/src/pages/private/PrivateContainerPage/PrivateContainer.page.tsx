import BrandLogo from '../../../assets/brandLogo2.svg'
import { CATALOGUE_URL, INITIAL_USER_CONFIG } from '@wizard/utils/constants'
import { clearStorage } from '@wizard/utils/helpers'
import { ROUTES_CONST } from '@wizard/routes/routes'
import { useAuth } from '@wizard/contexts'
import { useKeycloak } from '@react-keycloak/web'
import {
  AppDrawer,
  AppBar,
  BreadCrumb,
  CatalogueIcon,
  ResourceIcon,
  ServiceIcon,
  PersonIcon,
  MuiLogoutIcon,
} from '@gaia-x-frontend/components-lib'
import {
  Link,
  NavLink,
  Outlet,
  Params,
  useMatches,
  useNavigate,
} from 'react-router-dom'
import { useState } from 'react'

type BreadcrumbItem = {
  link: string
  key: string
  name: string
}
interface RouterMatch {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: {
    crumb?: () => BreadcrumbItem
  }
}
const PrivateContainerPage = () => {
  const navigate = useNavigate()
  const { keycloak } = useKeycloak()
  const auth = useAuth()
  const [closeProfileMenu, setCloseProfileMenu] = useState(false)
  const matches: RouterMatch[] = useMatches() as RouterMatch[]
  const crumbs: BreadcrumbItem[] = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb?.()) as BreadcrumbItem[]

  const sideNavigationItems = [
    {
      to: CATALOGUE_URL,
      label: 'Public catalogue',
      icon: CatalogueIcon,
      external: true,
    },
    {
      to: `/${ROUTES_CONST.PRIVATE}/${ROUTES_CONST.SERVICE_MANAGEMENT}`,
      label: 'Service management',
      icon: ServiceIcon,
      external: false,
    },
    {
      to: `/${ROUTES_CONST.PRIVATE}/${ROUTES_CONST.RESOURCE_MANAGEMENT}`,
      label: 'Resources management',
      icon: ResourceIcon,
      external: false,
    },
  ]

  const navigationItems = [
    {
      to: ROUTES_CONST.ROOT,
      label: 'Gaia-X Wizard',
      external: false,
    },
  ]

  const navItem = (
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
            onClick={() => setCloseProfileMenu(false)}
          >
            {navigationItem.label}
          </NavLink>
        )
      )}
    </>
  )

  const sideNavItem = (
    <>
      {sideNavigationItems.map((navigationItem) => (
        <li className={'navItem'} key={navigationItem.to}>
          {navigationItem.external ? (
            <a
              key={navigationItem.to}
              href={navigationItem.to}
              className="navLink flex gap-[1rem] items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <navigationItem.icon />
              {navigationItem.label}
            </a>
          ) : (
            <NavLink
              key={navigationItem.to}
              to={navigationItem.to}
              className={({ isActive }) =>
                isActive
                  ? 'navLink active flex gap-[1rem] items-center'
                  : 'navLink flex gap-[1rem] items-center'
              }
              onClick={() => setCloseProfileMenu(false)}
            >
              <navigationItem.icon />
              {navigationItem.label}
            </NavLink>
          )}
        </li>
      ))}
    </>
  )

  const handleLogoutClick = () => {
    clearStorage()
    auth?.setConfig(INITIAL_USER_CONFIG)
    keycloak
      .logout()
      .then(() => {
        navigate(ROUTES_CONST.AUTH)
      })
      .catch(() => {})
  }

  const profileItem = (
    <>
      <NavLink
        to={`/${ROUTES_CONST.PRIVATE}/${ROUTES_CONST.PROFILE}`}
        className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
        onClick={() => setCloseProfileMenu(true)}
      >
        <PersonIcon /> Profile
      </NavLink>

      <button onClick={handleLogoutClick}>
        <MuiLogoutIcon /> Logout
      </button>
    </>
  )

  return (
    <div>
      <AppBar
        headerTabs={navItem}
        profileMenuTabs={profileItem}
        isAllowProfileMenu={true}
        isCloseProfileMenu={closeProfileMenu}
      >
        <Link to={'/'}>
          <img src={BrandLogo} alt="gaia-x logo" />
        </Link>
      </AppBar>

      <div className="flex h-[calc(100vh-11.4rem)] overflow-hidden">
        <AppDrawer drawerItem={sideNavItem} />
        <div className="  overflow-y-auto h-full flex-1 bg-[#FAFAFF]">
          <div className="m-[2.5rem]">
            {crumbs ? (
              <BreadCrumb
                items={crumbs}
                onItemClick={(item) => {
                  navigate(item.link)
                }}
              />
            ) : null}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default PrivateContainerPage
