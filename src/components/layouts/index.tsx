import Header from '../header'
import Sidebar from '../sidebar'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth-context'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function Layout({ children }: any) {
  const { userInfo } = useAuth()
  const router = useRouter()
  const sidebar = useSelector((state: any) => state.sidebar.sidebarState)

  useEffect(() => {
    if (!userInfo) return
    if (localStorage.getItem('userInfo') === null) {
      router.push('/signin')
    }
  }, [])

  return (
    <div className="flex flex-col bg-white relative">
      <Header />

      <div className="flex w-full h-[calc(100%-64px)] top-16">
        <Sidebar sidebar={sidebar} />
        <div className="w-full flex mt-16 p-6">{children}</div>
      </div>
    </div>
  )
}
