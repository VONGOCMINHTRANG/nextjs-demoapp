import Header from '../header'
import Sidebar from '../sidebar'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Layout({ children }: any) {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
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
