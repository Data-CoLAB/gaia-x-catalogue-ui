import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { AppLoader } from './components/index.ts'
import { AuthProvider } from '@wizard/contexts'
import { keycloakCredentials } from './utils/keycloak.ts'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { setBrowserSession } from './utils/helpers'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //
  <ReactKeycloakProvider
    authClient={keycloakCredentials}
    initOptions={{ checkLoginIframe: false, onLoad: 'check-sso' }}
    onTokens={({ token }) => {
      if (token) {
        setBrowserSession(token)
      }
    }}
    LoadingComponent={<AppLoader type="linear" />}
  >
    <AuthProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </AuthProvider>
  </ReactKeycloakProvider>
)
