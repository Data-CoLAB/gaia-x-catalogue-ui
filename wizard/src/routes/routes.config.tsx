import { createBrowserRouter } from 'react-router-dom'
import { getMaster } from '@wizard/api/auth.api'
import { lazy } from 'react'
import { MasterType } from '@wizard/utils/constants'
import { ROUTES_CONST } from './routes'
import {
  AppLoader,
  AuthRoute,
  ErrorPage,
  NoAuthRoute,
  ParticipantRoute,
} from '../components'

// Public page lazy load imports
const PublicContainerLazy = lazy(
  () => import('../pages/public/PublicContainerPage/PublicContainer.page')
)
const AuthenticationPageLazy = lazy(
  () => import('../pages/public/AuthenticationPage/Authentication.page')
)

const OnRegisterParticipantPageLazy = lazy(
  () =>
    import('../pages/public/RegisterParticipantPage/RegisterParticipant.page')
)

const EmailConfirmationPageLazy = lazy(
  () => import('../pages/public/EmailConfirmationPage/EmailConfirmation.page')
)
const ServiceOfferingCreationPublicPageLazy = lazy(
  () => import('../pages/public/CreateServiceOfferingPage/ServiceOffering.page')
)

const ResourceCreationPublicPageLazy = lazy(
  () => import('../pages/public/CreateResourcePage/Resource.page')
)

const PageNotFoundLazy = lazy(
  () => import('../pages/public/PageNotFoundPage/PageNotFoundPage.page')
)

// Private page lazy load imports
const ParticipantCreationPageLazy = lazy(
  () =>
    import('../pages/private/ParticipantCreationPage/ParticipantCreation.page')
)

const PrivateContainerLazy = lazy(
  () => import('../pages/private/PrivateContainerPage/PrivateContainer.page')
)

const ServiceOfferingManagementPageLazy = lazy(
  () =>
    import(
      '../pages/private/service-offering-pages/ServiceOfferingManagementPage/ServiceOfferingManagement.page'
    )
)

const ServiceOfferingListPageLazy = lazy(
  () =>
    import(
      '../pages/private/service-offering-pages/ServiceOfferingListPage/ServiceOfferingList.page'
    )
)

const ServiceOfferingCreationPageLazy = lazy(
  () =>
    import(
      '../pages/private/service-offering-pages/ServiceOfferingCreationPage/ServiceOfferingCreation.page'
    )
)
const ServiceOfferingDetailsPageLazy = lazy(
  () =>
    import(
      '../pages/private/service-offering-pages/ServiceOfferingDetails/ServiceOfferingDetails.page'
    )
)

const ResourceManagementPageLazy = lazy(
  () =>
    import(
      '../pages/private/resource-pages/ResourceManagementPage/ResourceManagement.page'
    )
)

const ResourceListPageLazy = lazy(
  () =>
    import('../pages/private/resource-pages/ResourceListPage/ResourceList.page')
)

const ResourceCreationPageLazy = lazy(
  () =>
    import(
      '../pages/private/resource-pages/ResourceCreationPage/ResourceCreation.page'
    )
)

const WalletPageLazy = lazy(
  () => import('../pages/private/WalletPage/Wallet.page')
)

const ProfilePageLazy = lazy(
  () => import('../pages/private/ProfilePage/Profile.page')
)

const ROUTES = [
  {
    path: ROUTES_CONST.ROOT,
    element: (
      <NoAuthRoute>
        <AuthenticationPageLazy />
      </NoAuthRoute>
    ),
    loading: <AppLoader type="linear" />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_CONST.AUTH,
    element: (
      <NoAuthRoute>
        <AuthenticationPageLazy />
      </NoAuthRoute>
    ),
    loading: <AppLoader type="linear" />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_CONST.SIGN_UP,
    element: <OnRegisterParticipantPageLazy />,
    loading: <AppLoader type="linear" />,
    loader: async () => {
      try {
        const responses = await Promise.all([
          getMaster(MasterType.RegistrationType, {
            page: 0,
            size: 500,
          }),
          getMaster(MasterType.EntityType, {
            page: 0,
            size: 500,
          }),
        ])
        return {
          registrationTypes: responses[0].payload.content,
          entityTypes: responses[1].payload.content,
        }
      } catch (error) {
        return null
      }
    },
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_CONST.EMAIL_VERIFY,
    element: <EmailConfirmationPageLazy />,
    loading: <AppLoader type="linear" />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES_CONST.BECOME_PARTICIPANT,
    element: (
      <AuthRoute>
        <ParticipantCreationPageLazy />
      </AuthRoute>
    ),
    errorElement: <div>Error.....</div>,
    loading: <AppLoader type="linear" />,
  },
  {
    path: ROUTES_CONST.PUBLIC,
    element: (
      <NoAuthRoute>
        <PublicContainerLazy />
      </NoAuthRoute>
    ),
    loading: <AppLoader type="linear" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES_CONST.PUBLIC_SERVICE_OFFERING_CREATE,
        element: <ServiceOfferingCreationPublicPageLazy />,
        loading: <AppLoader type="linear" />,
        errorElement: <ErrorPage />,
      },
      {
        path: ROUTES_CONST.PUBLIC_RESOURCE_CREATE,
        element: <ResourceCreationPublicPageLazy />,
        loading: <AppLoader type="linear" />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: ROUTES_CONST.PRIVATE,
    element: (
      <ParticipantRoute>
        <PrivateContainerLazy />
      </ParticipantRoute>
    ),
    loading: <AppLoader type="linear" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES_CONST.SERVICE_MANAGEMENT,
        element: <ServiceOfferingManagementPageLazy />,
        errorElement: <ErrorPage />,
        loading: <AppLoader type="linear" />,
        handle: {
          crumb: () => {
            return {
              link: ROUTES_CONST.SERVICE_MANAGEMENT,
              name: 'Service Management',
              key: 'serviceManagement',
            }
          },
        },
        children: [
          {
            path: '',
            element: <ServiceOfferingListPageLazy />,
            errorElement: <ErrorPage />,
            loading: <AppLoader type="linear" />,
          },
          {
            path: ROUTES_CONST.SERVICE_OFFERING_CREATE,
            element: <ServiceOfferingCreationPageLazy />,
            errorElement: <ErrorPage />,
            loading: <AppLoader type="linear" />,
            handle: {
              crumb: () => {
                return {
                  link: ROUTES_CONST.PUBLIC_SERVICE_OFFERING_CREATE,
                  name: 'Create Service',
                  key: 'createService',
                }
              },
            },
          },
          {
            path: ROUTES_CONST.SERVICE_ID,
            element: <ServiceOfferingDetailsPageLazy />,
            errorElement: <ErrorPage />,
            loading: <AppLoader type="linear" />,
            handle: {
              crumb: () => {
                return {
                  link: ROUTES_CONST.SERVICE_ID,
                  name: 'Service details',
                  key: 'servicedetails',
                }
              },
            },
          },
        ],
      },

      {
        path: ROUTES_CONST.RESOURCE_MANAGEMENT,
        element: <ResourceManagementPageLazy />,
        errorElement: <ErrorPage />,
        loading: <AppLoader type="linear" />,
        handle: {
          crumb: () => {
            return {
              link: ROUTES_CONST.RESOURCE_MANAGEMENT,
              name: 'Resource Management',
              key: 'resourceManagement',
            }
          },
        },
        children: [
          {
            path: '',
            element: <ResourceListPageLazy />,
            errorElement: <ErrorPage />,
            loading: <AppLoader type="linear" />,
          },
          {
            path: ROUTES_CONST.RESOURCE_CREATE,
            element: <ResourceCreationPageLazy />,
            errorElement: <ErrorPage />,
            loading: <AppLoader type="linear" />,
            handle: {
              crumb: () => {
                return {
                  link: ROUTES_CONST.RESOURCE_CREATE,
                  name: 'Create Resource',
                  key: 'resourceCreate',
                }
              },
            },
          },
        ],
      },
      {
        path: ROUTES_CONST.WALLET,
        element: <WalletPageLazy />,
        errorElement: <ErrorPage />,
        loading: <AppLoader type="linear" />,
      },
      {
        path: ROUTES_CONST.PROFILE,
        element: <ProfilePageLazy />,
        errorElement: <ErrorPage />,
        loading: <AppLoader type="linear" />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFoundLazy />,
    errorElement: <ErrorPage />,
    loading: <AppLoader type="linear" />,
  },
]

const router = createBrowserRouter(ROUTES)

export { router }
