import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useNavigate } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core/styles'
// import LinearProgress from '@material-ui/core/LinearProgress'

//this wraps several routes, and so the wrapped elemtns(children ) get passed down and we do stuff with it
const UserRoute = ({ children, showNav = true }) => {
  // state
  const [ok, setOk] = useState(true)
  // router
  const router = useRouter()
  const navigate = useNavigate

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        '${process.env.NEXT_PUBLIC_API}/api/current-user'
      )
      console.log('', data)
      if (data.ok) setOk(true)
    } catch (err) {
      console.log(err)
      setOk(false)
      router.push('/signin')
    }
  }

  return (
    <>
      {!ok && (
        <div>
          <div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserRoute
