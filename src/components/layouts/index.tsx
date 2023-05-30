import Header from '../header'
import Sidebar from '../sidebar'

export default function Layout({ children }: any) {
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
