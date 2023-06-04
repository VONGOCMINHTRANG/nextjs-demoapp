import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useCheckLoggedIn() {
  const [checkLogged, setCheckLogged] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('userInfo') || '{}').email
    if (localStorage.getItem('userInfo') === null) {
      setCheckLogged(false)
    } else {
      setCheckLogged(true)
      router.push(`/account-info/${email}`)
    }
  }, [])

  return {
    checkLogged,
    setCheckLogged,
  }
}
