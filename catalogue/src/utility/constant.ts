export const STANDARD_LIMIT_FOR_PAGINATION = 20

export const API_BASE_URL = import.meta.env.VITE_CATALOGUE_API_BASE_URL
export const WIZARD_URL = import.meta.env.VITE_WIZARD_HOST
export const VITE_BASE_PATH = import.meta.env.VITE_BASE_PATH
export const STREAMLIT_PATH = import.meta.env.VITE_STREAMLIT_PATH
export const VITE_STREAMLIT_IFRAME = import.meta.env.VITE_STREAMLIT_IFRAME
export const BASE_URL = import.meta.env.BASE_URL

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
}

export enum ApiStatus {
  Pending = 'pending',
  InProgress = 'in progress',
  Success = 'success',
  Failure = 'failure',
}

export const API = {
  getServiceList: {
    Method: HttpMethod.Post,
    URL: `/gaiax/catalogue/search`,
  },
  getTagsList: {
    Method: HttpMethod.Get,
    URL: `/gaiax/catalogue/tags`,
  },
  getServiceDetail: {
    Method: HttpMethod.Get,
    URL: (id: string) => `/gaiax/catalogue/service-details?id=${id}`,
  },
  getSearchOptions: {
    Method: HttpMethod.Post,
    URL: `/gaiax/catalogue/selector/option/:option/property/:property`,
  },
  getSelector: {
    Method: HttpMethod.Get,
    URL: `/gaiax/catalogue/selector`,
  },
  getGrammer: {
    Method: HttpMethod.Get,
    URL: `/gaiax/catalogue/grammar`,
  },
}
export const ACCESS_TOKEN_KEY = 'token'
export const SELECTED_ENTITY_LOCAL_STORAGE_KEY = 'ent'
export const DASHBOARD_CONTAINER_ID = 'contentContainerId'
export const SORT_DROP_DOWN_OPTIONS = [
  {
    value: 0,
    label: 'Latest Created',
  },
  {
    label: 'Label Level- High to Low',
    value: 1,
  },
  {
    label: 'Label Level- Low to High',
    value: 2,
  },
  {
    label: 'Trust Score - High to Low',
    value: 3,
  },
  {
    label: 'Trust Score - Low to High',
    value: 4,
  },
]
