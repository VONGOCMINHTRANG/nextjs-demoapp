import Header from '../header'
import Sidebar from '../sidebar'

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <Header />

      <div className="flex w-full h-screen">
        <Sidebar />
        <main className="p-6 w-full flex h-fit">{children}</main>
      </div>
    </div>
  )
}
