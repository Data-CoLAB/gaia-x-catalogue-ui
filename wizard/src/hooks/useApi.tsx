import { useState, useEffect } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const useAPI = <T,>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response: AxiosResponse<T> = await axios(url, options)
      setData(response.data)
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    void fetchData()
  }, [])

  return { data, isLoading, error }
}
