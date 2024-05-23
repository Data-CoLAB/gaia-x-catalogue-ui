export interface ApiResponse<T> {
  status: number
  payload: T
  message?: string
}