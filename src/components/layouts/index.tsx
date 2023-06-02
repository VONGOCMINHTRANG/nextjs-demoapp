import Header from '../header'
import Sidebar from '../sidebar'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth-context'
import { useRouter } from 'next/router'

export default function Layout({ children }: any) {
  const { userInfo } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!userInfo) return
    if (localStorage.getItem('userInfo') === null) {
      router.push('/signin')
    }
  }, [])

  return (
    <div className="flex flex-col bg-gray-100 h-screen relative">
      <Header />

      <div className="flex w-full h-[calc(100%-64px)]">
        <Sidebar />
        <main className="w-full flex mt-16 p-6">{children}</main>
      </div>
    </div>
  )
}
function userRouter() {
  throw new Error('Function not implemented.')
}
