import Keycloak from 'keycloak-js'

const keycloakCredentials = new Keycloak({
  clientId: import.meta.env.VITE_WIZARD_KEYCLOAK_AUTH_CLIENT,
  realm: import.meta.env.VITE_WIZARD_KEYCLOAK_AUTH_REALM,
  url: import.meta.env.VITE_WIZARD_KEYCLOAK_AUTH_URI,
})

// Setting minimum token validity to 1 hour
const TOKEN_MIN_VALIDITY = 1 * 60 * 60

export const updateTokenIfMinValidityReached = async () => {
  try {
    await keycloakCredentials.updateToken(TOKEN_MIN_VALIDITY)
  } catch (e) {
    console.log('Token not updated')
  }
}

export { keycloakCredentials }
