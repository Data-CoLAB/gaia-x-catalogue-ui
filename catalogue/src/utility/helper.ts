/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosError } from 'axios'
import { ACCESS_TOKEN_KEY, DASHBOARD_CONTAINER_ID } from './constant'
import { Query } from '@catalogue/models/Catalogue.model'

export type AuthToken = {
  t: string
}

export const setBrowserSession = (token: string) => {
  const tokenObject = {
    t: token,
  }

  setToStore('token', tokenObject)
}

export const setToStore = (key: string, obj = {}) => {
  localStorage.setItem(key, JSON.stringify(obj))
}

export function parseAPI(
  template: string,
  templateParams: { [key: string]: string | number }
) {
  let url = template
  for (const key of Object.keys(templateParams)) {
    url = url.replace(`{${key}}`, `${templateParams[key]}`)
  }
  return url
}
export const getFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key)
  try {
    return JSON.parse(item!)
  } catch (e) {
    console.error(e)
  }
}

export const existKeyInStore = (key: string) => {
  const item = getFromLocalStorage(key)
  // const item = getFromSessionStorage(key)
  return !!item
}

/**
 *
 * @param data Data got after http request from axios
 * @returns
 * @description Used in HTTP.ts to get data from request in axios
 */

export const getActualResponseFromAxiosRequest = (data: AxiosError) => {
  if (data.request) {
    return data.request.response
  }
  return data.request
}

export const getAuthToken = (): AuthToken => {
  const token: AuthToken = {
    t: '',
  }
  try {
    const tokenFromStorage = getFromLocalStorage(ACCESS_TOKEN_KEY)
    token.t = tokenFromStorage?.t
    return token
  } catch (e) {
    return token
  }
}

export const redirectToLogin = () => {
  location.replace(`/`)
}

export const redirectToUnauthorized = () => {
  // location.replace(`${ROUTES.UNAUTHORIZED}`)
}

export const removeFromStore = (key: string) => {
  const item = getFromLocalStorage(key)
  // const item = getFromSessionStorage(key)
  if (item) {
    localStorage.removeItem(key)
    // sessionStorage.removeItem(key)
    return true
  } else {
    return false
  }
}

export function returnParsedJson(jsonObject: string) {
  try {
    const parsedJson = JSON.parse(jsonObject)
    return parsedJson
  } catch (e) {
    return false
  }
}

export const setToLocalStore = (key: string, obj = {}) => {
  localStorage.setItem(key, JSON.stringify(obj))
}

export const setToSessionStore = (key: string, obj = {}) => {
  sessionStorage.setItem(key, JSON.stringify(obj))
}

export const getFromSessionStorage = (key: string) => {
  const item: string | null = sessionStorage.getItem(key)
  try {
    return JSON.parse(item!)
  } catch (e) {
    /*empty block*/
  }
}

export const removeFromSessionStore = (key: string) => {
  const item = getFromSessionStorage(key)
  if (item) {
    sessionStorage.removeItem(key)
    return true
  } else {
    return false
  }
}

export const onLogOut = () => {
  clearStorage()
  redirectToLogin()
}

export const clearStorage = () => {
  sessionStorage.clear()
  localStorage.clear()
}

export const containerScrollToTop = () => {
  const element = document.getElementById(DASHBOARD_CONTAINER_ID)
  if (element) element.scrollTo(0, 0)
}

export const SortOrderHelper = (sort_order: number) => {
  switch (sort_order) {
    case 0:
      return [
        {
          column: 'createdAt',
          sortType: 'DESC',
        },
      ]
      break
    case 1:
      return [
        {
          column: 'labelLevel',
          sortType: 'DESC',
        },
        {
          column: 'createdAt',
          sortType: 'DESC',
        },
      ]
      break
    case 2:
      return [
        {
          column: 'labelLevel',
          sortType: 'ASC',
        },
        {
          column: 'createdAt',
          sortType: 'DESC',
        },
      ]
      break
    case 3:
      return [
        {
          column: 'trustIndex',
          sortType: 'DESC',
        },
        {
          column: 'createdAt',
          sortType: 'DESC',
        },
      ]
      break
    case 4:
      return [
        {
          column: 'trustIndex',
          sortType: 'ASC',
        },
        {
          column: 'createdAt',
          sortType: 'DESC',
        },
      ]
      break
    default:
      return undefined
  }
}

export const labelHelper = (value: string, property: string) => {
  switch (value) {
    case 'Address':
      return 'Location'
      break
    case 'Participant':
      return 'Provided by'
      break
    case 'DataProtectionRegime':
      return 'Data protection regime'
      break
    case 'DataAccountExport':
      switch (property) {
        case 'formatType':
          return 'Format type'
          break
        case 'requestType':
          return 'Request type'
          break
        case 'accessType':
          return 'Access type'
          break
        default:
          return value
      }
    case 'ServiceOffering':
      return 'SO list (depends on)'
      break
    case 'Resource':
      return 'RO list (aggregation of)'
      break
    default:
      return value
  }
}

export const SearchQueryHelper = (search: string): Query => {
  return {
    or: [
      {
        value: [search],
        node: 'ServiceOffering',
        key: 'name',
        operator: 'contain',
      },
    ],
  }
}
