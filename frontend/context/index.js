import { useReducer, createContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const intialState = {
  user: null,
}

const Context = createContext()

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }

    case 'LOGOUT':
      return { ...state, user: null }

    default:
      return state
  }
}

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, intialState)

  const router = useRouter()

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    })
  }, [])

  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      let res = error.response
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get(`${process.env.NEXT_PUBLIC_API}/api/logout`)
            .then((data) => {
              console.log('/401 error > logout')
              dispatch({ type: 'LOGOUT' })
              window.localStorage.removeItem('user')
              router.push('/signin')
            })
            .catch((err) => {
              console.log('AXIOS INTERCEPTORS ERR', err)
              reject(error)
            })
        })
      }
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/csrf-token`
      )

      axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken
    }
    getCsrfToken()
  }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export { Context, ContextProvider }
