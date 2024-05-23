/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES_CONST } from './routes'
import { AppLoader, ErrorPage } from '@catalogue/components'

const CatalogueContainerLazy = lazy(
  () => import('../pages/Catalogue/Catalogue.page')
)
const StreamlitContainerLazy = lazy(
  () => import('../pages/Streamlit/Streamlit.page')
)
const ServiceListingLazy = lazy(
  () => import('../pages/ServiceListing/ServiceListing.page')
)

const PageNotFoundPageLazy = lazy(
  () => import('../pages/PageNotFoundPage/PageNotFoundPage.page')
)

const ROUTES = [
  {
    path: ROUTES_CONST.ROOT,
    element: <CatalogueContainerLazy />,
    errorElement: <ErrorPage />,
    loading: <AppLoader type="linear" />,
    children: [
      {
        path: ROUTES_CONST.CATALOGUE,
        element: <ServiceListingLazy />,
        errorElement: <ErrorPage />,
        loading: <AppLoader type="linear" />,
      },
      {
        path: ROUTES_CONST.STREAMLIT,
        element: <StreamlitContainerLazy />,
        errorElement: <ErrorPage />,
        loading: <AppLoader type="linear" />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFoundPageLazy />,
    errorElement: <ErrorPage />,
    loading: <AppLoader type="linear" />,
  },
]

const router = createBrowserRouter(ROUTES)

export { router }
