const PRIVATE = 'private'
const PUBLIC = 'public'

const ROUTES_CONST = {
  ROOT: '/',
  PUBLIC: PUBLIC,
  AUTH: `${PUBLIC}/auth`,
  SIGN_UP: `${PUBLIC}/sign-up`,
  EMAIL_VERIFY: `${PUBLIC}/verify-email`,
  PUBLIC_RESOURCE_CREATE: `create-resource`,
  PUBLIC_SERVICE_OFFERING_CREATE: `create-service-offering`,
  PRIVATE: PRIVATE,
  BECOME_PARTICIPANT: 'become-participant',
  SERVICE_MANAGEMENT: `services`,
  SERVICE_OFFERING_CREATE: `create`,
  RESOURCE_MANAGEMENT: `resources`,
  RESOURCE_CREATE: `create`,
  WALLET: `wallet`,
  PROFILE: `profile`,
  SERVICE_ID: `:serviceId`,
}

export { ROUTES_CONST, PRIVATE, PUBLIC }
