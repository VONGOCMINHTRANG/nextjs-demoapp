import { useEffect, useRef, useState } from 'react'

export default function useClickLanguage() {
  const [showLanguage, setShowLanguage] = useState<boolean>(false)
  const languageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOut = (e: any) => {
      // console.log(e.target);
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        // console.log('click outsite')
        setShowLanguage(false)
      } else {
        setShowLanguage(true)
      }
    }

    document.addEventListener('click', handleClickOut)
    return () => {
      document.removeEventListener('clcik', handleClickOut)
    }
  }, [])

  return {
    showLanguage,
    setShowLanguage,
    languageRef,
  }
}
