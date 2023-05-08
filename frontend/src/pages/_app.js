import '@/styles/tailwind.css'
import 'focus-visible'
import { ContextProvider } from '../../context/index.js'
import { Provider } from 'react-redux'
import store from '../../redux/store.js'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ContextProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ContextProvider>
    </>
  )
}
