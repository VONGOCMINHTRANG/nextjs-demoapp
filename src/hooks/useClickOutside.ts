import { useEffect, useRef, useState } from 'react'

export default function useClickOutsite() {
  const [show, setShow] = useState<boolean>(false)
  const nodeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOut = (e: any) => {
      // console.log(e.target);
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        console.log('click outsite')
        setShow(false)
      } else {
        setShow(true)
      }
    }

    document.addEventListener('click', handleClickOut)
    return () => {
      document.removeEventListener('clcik', handleClickOut)
    }
  }, [])

  return {
    show,
    setShow,
    nodeRef,
  }
}
