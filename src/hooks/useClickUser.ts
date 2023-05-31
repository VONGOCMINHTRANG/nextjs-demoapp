import { useEffect, useRef, useState } from 'react'

export default function useClickUser() {
  const [showUser, setShowUser] = useState<boolean>(false)
  const userRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOut = (e: any) => {
      // console.log(e.target);
      if (userRef.current && !userRef.current.contains(e.target)) {
        // console.log('click outsite')
        setShowUser(false)
      } else {
        setShowUser(true)
      }
    }

    document.addEventListener('click', handleClickOut)
    return () => {
      document.removeEventListener('click', handleClickOut)
    }
  }, [])

  return {
    showUser,
    setShowUser,
    userRef,
  }
}
