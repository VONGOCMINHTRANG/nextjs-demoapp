import Sidebar from '../sidebar'

export default function Layout({ children }: any) {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  )
}
