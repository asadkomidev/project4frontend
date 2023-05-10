import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const UserRoute = ({ children, showNav = true }) => {
  const [ok, setOk] = useState(true)
  const router = useRouter()

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
