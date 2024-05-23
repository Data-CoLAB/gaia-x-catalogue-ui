/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WIZARD_HOST: string
  readonly VITE_CATALOGUE_API_BASE_URL: string
  readonly VITE_BASE_PATH: string
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
