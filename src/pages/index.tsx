import { collection, getDocs } from 'firebase/firestore'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase'
import { signOut } from '@firebase/auth'
import { useRouter } from 'next/router'
import AccountInformation from '../pages/account-info'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [data, setData] = useState({})
  const router = useRouter()

  const handleSignOut = (e: any) => {
    signOut(auth)
    router.push('/signin')
  }

  // console.log(auth.currentUser);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, 'users')
      const snapshots = await getDocs(colRef)
      setData(snapshots)
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   if(auth.currentUser === null) {
  //     router.push('/sign-in');
  //   }
  // }, [])

  return (
    <div className="p-2">
      <div>Home</div>
      <AccountInformation />
      <button onClick={handleSignOut} className="bg-red-400 rounded-sm px-2 py-1 text-white">
        Sign out
      </button>
    </div>
  )
}
