export const setBrowserSession = (token?: string) => {
  setToLocalStorage('token', token)
}

export const setToSessionStorage = (key: string, obj = {}) => {
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

export const removeFromSessionStorage = (key: string) => {
  const item = getFromSessionStorage(key)
  if (item) {
    sessionStorage.removeItem(key)
    return true
  } else {
    return false
  }
}

export const keyExistsInSessionStorage = (key: string) => {
  const item = getFromSessionStorage(key)
  return !!item
}

export const setToLocalStorage = (key: string, obj = {}) => {
  localStorage.setItem(key, JSON.stringify(obj))
}

export const getFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key)
  try {
    return JSON.parse(item!)
  } catch (e) {
    console.error(e)
  }
}

export const removeFromLocalStorage = (key: string) => {
  const item = getFromLocalStorage(key)
  if (item) {
    localStorage.removeItem(key)
    return true
  } else {
    return false
  }
}

export const keyExistsInLocalStorage = (key: string) => {
  const item = getFromLocalStorage(key)
  return !!item
}

export const clearStorage = () => {
  sessionStorage.clear()
  localStorage.clear()
}
