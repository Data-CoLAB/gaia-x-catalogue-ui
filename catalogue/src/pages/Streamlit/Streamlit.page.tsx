import { VITE_STREAMLIT_IFRAME } from '@catalogue/utility/constant'

const StreamlitPage = () => {
  return (
    <iframe height="100%" src={VITE_STREAMLIT_IFRAME} width="100%"></iframe>
  )
}
export default StreamlitPage
