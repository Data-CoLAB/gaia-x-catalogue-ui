/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WIZARD_API_BASE_URL: string
  readonly VITE_WIZARD_KEYCLOAK_AUTH_URI: string
  readonly VITE_WIZARD_KEYCLOAK_AUTH_CLIENT: string
  readonly VITE_WIZARD_KEYCLOAK_AUTH_REALM: string
  readonly VITE_CATALOGUE_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
