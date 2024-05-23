export interface CheckRegistrationRequestParams {
  email: string
}

export interface CheckRegistrationResponsePayload {
  userRegistered: boolean
  deviceConfigured: boolean
}
