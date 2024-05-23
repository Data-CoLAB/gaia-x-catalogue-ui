/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, {
  AxiosProgressEvent,
  RawAxiosRequestHeaders,
  ResponseType,
} from 'axios'
import { ACCESS_TOKEN_KEY, API_BASE_URL } from './constant'

import { getAlert } from '../hooks/useAlert.hooks'
import {
  existKeyInStore,
  getActualResponseFromAxiosRequest,
  getAuthToken,
  returnParsedJson,
  containerScrollToTop,
  redirectToUnauthorized,
  onLogOut,
} from './helper'

const defaultHeaders = {
  'Content-Type': 'application/json; charset=UTF-8',
}

let loaderCount = 0
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ...defaultHeaders,
  },
})

axiosInstance.interceptors.request.use((config) => {
  if (existKeyInStore(ACCESS_TOKEN_KEY)) {
    const tokenObject = getAuthToken()
    const token = tokenObject.t || ''
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) return response.data
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      onLogOut()
      return Promise.reject({ show: false })
    } else if (error && error.response?.status === 403) {
      redirectToUnauthorized()
    }

    const parsedJson = returnParsedJson(
      getActualResponseFromAxiosRequest(error)
    )
    if (!parsedJson) {
      if (error.message === 'Network Error') {
        return Promise.reject({ show: false })
      }
      return Promise.reject(error)
    }
    return Promise.reject(JSON.parse(getActualResponseFromAxiosRequest(error)))
  }
)

const getAPI = async (
  endpoint: string,
  headers: RawAxiosRequestHeaders = {},
  showLoader = true,
  showSuccessAlert = false,
  hideFailureAlert = false,
  hideFailureAlertForAllCase = false,
  param: any = {}
) => {
  if (showLoader) {
    showLoading()
  }

  return axiosInstance
    .get(endpoint, {
      headers: {
        ...headers,
      },
      params: {
        ...param,
      },
    })
    .then((resp: any) => {
      showSuccessAlertMessage(showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      if (
        error &&
        error.message &&
        error.status !== 404 &&
        !hideFailureAlert &&
        !hideFailureAlertForAllCase
      ) {
        getAlert('error', error.message)
      }
      throw error
    })
    .finally(() => {
      showLoadingDisplay(showLoader)
    })
}

const postAPI = async (
  endpoint: string,
  data: any = {},
  customHeaders: RawAxiosRequestHeaders = {},
  showLoader = true,
  showSuccessAlert = true,
  showErrorAlert = true,
  scrollToTop = false
) => {
  if (showLoader) {
    showLoading()
  }

  return axiosInstance
    .post(endpoint, data, {
      headers: {
        ...customHeaders,
      },
    })
    .then((resp: any) => {
      if (scrollToTop) containerScrollToTop()

      showSuccessAlertMessage(showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      if (error && error.message && showErrorAlert === true) {
        getAlert('error', error.message)
      }
      throw error
    })
    .finally(() => {
      showLoadingDisplay(showLoader)
    })
}

const putAPI = async (
  endpoint: string,
  data: any = {},
  customHeaders: RawAxiosRequestHeaders = {},
  showLoader = true,
  showSuccessAlert = true
) => {
  if (showLoader) {
    showLoading()
  }

  return axiosInstance
    .put(endpoint, data, {
      headers: {
        ...customHeaders,
      },
    })
    .then((resp: any) => {
      showSuccessAlertMessage(showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      showErrorAlertMessage(error)
      throw error
    })
    .finally(() => {
      showLoadingDisplay(showLoader)
    })
}

const deleteAPI = async (
  endpoint: string,
  data?: any,
  customHeaders: RawAxiosRequestHeaders = {},
  showLoader = true,
  showSuccessAlert = true
) => {
  if (showLoader) {
    showLoading()
  }

  return axiosInstance
    .delete(endpoint, {
      headers: { ...customHeaders },
      data: data,
    })
    .then((resp: any) => {
      showSuccessAlertMessage(showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      showErrorAlertMessage(error)
      throw error
    })
    .finally(() => {
      showLoadingDisplay(showLoader)
    })
}

const getBlob = async (
  endpoint: string,
  headers: RawAxiosRequestHeaders = {},
  showLoader = true,
  showSuccessAlert = false,
  onDownloadProgress?: (event: AxiosProgressEvent) => any,
  signal?: AbortSignal,
  param: any = {}
) => {
  if (showLoader) {
    showLoading()
  }

  return axiosInstance
    .get(endpoint, {
      headers: {
        ...headers,
      },
      params: {
        ...param,
      },
      responseType: 'blob',
      onDownloadProgress,
      signal: signal,
    })
    .then((resp: any) => {
      showSuccessAlertMessage(showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      if (error && error.message && error.message !== 'canceled') {
        getAlert('error', error.message)
      }
      throw error
    })
    .finally(() => {
      showLoadingDisplay(showLoader)
    })
}

const postBlob = async (
  endpoint: string,
  params: any = {},
  customHeaders: RawAxiosRequestHeaders = {},
  responseType: ResponseType,
  onDownloadProgress?: (event: AxiosProgressEvent) => any,
  onUploadProgress?: (event: AxiosProgressEvent) => any,
  signal?: AbortSignal,
  showLoader = true,
  showSuccessAlert = true,
  showErrorAlert = true
) => {
  if (showLoader) {
    showLoading()
  }

  return axiosInstance
    .post(endpoint, params, {
      headers: {
        ...customHeaders,
      },
      responseType: responseType,
      onDownloadProgress,
      onUploadProgress,
      signal: signal,
    })
    .then((resp: any) => {
      showSuccessAlertMessage(showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      if (error && error.message && showErrorAlert === true) {
        getAlert('error', error.message)
      }
      throw error
    })
    .finally(() => {
      showLoadingDisplay(showLoader)
    })
}

const patch = async (
  endpoint: string,
  data: any = {},
  customHeaders: RawAxiosRequestHeaders = {},
  showLoader = true,
  showSuccessAlert = true
) => {
  if (showLoader) {
    showLoading()
  }

  return axiosInstance
    .patch(endpoint, data, {
      headers: {
        ...customHeaders,
      },
    })
    .then((resp: any) => {
      showSuccessAlertMessage(showSuccessAlert, resp)
      return resp
    })
    .catch((error) => {
      showErrorAlertMessage(error)
      throw error
    })
    .finally(() => {
      showLoadingDisplay(showLoader)
    })
}

const getAxiosInstance = () => {
  return axiosInstance
}

//helper function to show/hide the loader
const showLoading = () => {
  const linearLoader = document.getElementsByClassName('apiLoader')
  if (linearLoader && linearLoader.length > 0) {
    loaderCount += 1
    linearLoader[0].classList.remove('hidden')
  }
}

const hideLoading = () => {
  const linearLoader = document.getElementsByClassName('apiLoader')
  loaderCount -= 1
  if (linearLoader && linearLoader.length > 0 && loaderCount <= 0) {
    linearLoader[0].classList.add('hidden')
  }
}
const showSuccessAlertMessage = (showSuccessAlert: boolean, resp: any) => {
  if (
    showSuccessAlert &&
    resp &&
    resp.message &&
    typeof resp.message === 'string'
  ) {
    getAlert('success', resp.message)
  }
}

const showErrorAlertMessage = (error: any) => {
  if (error && error.message) {
    getAlert('error', error.message)
  }
}

const showLoadingDisplay = (showLoader: boolean) => {
  if (showLoader) {
    hideLoading()
  }
}

export {
  deleteAPI,
  getAPI,
  getAxiosInstance,
  getBlob,
  patch,
  postAPI,
  postBlob,
  putAPI,
}
