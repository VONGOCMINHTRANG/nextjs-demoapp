import { useEffect } from 'react'
import { auth } from '../../config/firebase'
import { signOut } from '@firebase/auth'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const handleSignOut = (e: any) => {
    signOut(auth)
    localStorage.removeItem('user')
    router.push('/signin')
  }
  // console.log(auth.currentUser);

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      router.push('/signin')
    }
  }, [])

  return (
    <div className="p-2">
      <div>Home</div>
      <button onClick={handleSignOut} className="bg-red-400 rounded-sm px-2 py-1 text-white">
        Sign out
      </button>
    </div>
  )
}
