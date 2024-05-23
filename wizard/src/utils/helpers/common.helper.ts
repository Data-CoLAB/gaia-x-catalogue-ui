import dayjs from 'dayjs'
import { AxiosError } from 'axios'
import { DASHBOARD_CONTAINER_ID } from '../constants'
import { getAlert } from '@wizard/hooks/useAlert.hooks'

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

export function returnParsedJson(stringifiedJSON: string) {
  try {
    const parsedJson = JSON.parse(stringifiedJSON)
    return parsedJson
  } catch (e) {
    return false
  }
}

export const containerScrollToTop = () => {
  const element = document.getElementById(DASHBOARD_CONTAINER_ID)
  if (element) element.scrollTo(0, 0)
}

export function checkEmptyValue(value: unknown) {
  if (value === null || value === undefined) {
    return true
  } else if (typeof value === 'string' && value === '') {
    return true
  } else if (Array.isArray(value) && value.length === 0) {
    return true
  } else if (
    value.constructor === Object &&
    Object.entries(value).length === 0
  ) {
    return true
  }
  return false
}

export const handleCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      getAlert('success', 'URL copied successfully')
    })
    .catch(() => {})
}

export const getMillisecondToDate = (date: number) => {
  return new Date(date)
}

export const getLocalDate = (date: number | string | Date): Date => {
  const inputDate = new Date(date)
  const offsetInMinutes = inputDate.getTimezoneOffset()
  const localDate = new Date(inputDate.getTime() - offsetInMinutes * 60000)
  return localDate
}

export const formatDate = (
  inputDate: Date | string,
  formatType: 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy/MM/dd' | string
) => {
  // return format(new Date(inputDate), formatType)
  return dayjs(inputDate).format(formatType)
}

export const removeEmptyFields = (params: {
  [x: string]: any
  hasOwnProperty?: any
}) => {
  for (const field of Object.keys(params)) {
    if (params.hasOwnProperty(field)) {
      if (Array.isArray(params[field])) {
        if (checkEmptyValue(params[field])) {
          delete params[field]
        } else {
          params[field].forEach(
            (record: { [x: string]: any; hasOwnProperty?: any }) => {
              removeEmptyFields(record)
            }
          )
          params[field] = params[field].filter(
            (value: unknown) => !checkEmptyValue(value)
          )
          if (checkEmptyValue(params[field])) {
            delete params[field]
          }
        }
      } else if (typeof params[field] === 'object') {
        if (checkEmptyValue(params[field])) {
          delete params[field]
        } else {
          removeEmptyFields(params[field])
          if (checkEmptyValue(params[field])) {
            delete params[field]
          }
        }
      } else {
        if (checkEmptyValue(params[field])) {
          delete params[field]
        }
      }
    }
  }
  return params
}
