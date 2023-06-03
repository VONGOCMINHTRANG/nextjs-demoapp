import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MenuAccount() {
  const router = useRouter()
  const pathname = usePathname()
  const [email, setEmail] = useState<string>()

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('userInfo') || '{}').email
    setEmail(userEmail)
  }, [])

  return (
    <div className="text-md font-semibold text-black py-4 px-7 flex flex-col md:flex-row gap-5 md:gap-12 bg-gray-100 rounded-t-xl">
      <Link
        href={`/account-info/${email}`}
        className={`hover:text-green-600 
        ${pathname === `/account-info/${email}` ? 'text-green-600' : ''}`}
      >
        Thông tin tài khoản
      </Link>
      <Link
        href="/account-info/setupQR"
        className={`hover:text-green-600 ${
          router.pathname === '/account-info/setupQR' ? 'text-green-600' : ''
        }`}
      >
        Thông tin thiết lập QR
      </Link>
    </div>
  )
}
