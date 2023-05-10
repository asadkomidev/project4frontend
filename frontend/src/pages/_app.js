import '@/styles/tailwind.css'
import 'focus-visible'
import { ContextProvider } from '../../context/index.js'
import { Provider } from 'react-redux'
import store from '../../redux/store.js'
import Layout from '@/components/layout/Layout.jsx'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ContextProvider>
        <Provider store={store}>
          <Layout title="CL | Home">
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ContextProvider>
    </>
  )
}
