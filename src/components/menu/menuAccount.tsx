import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useEffect, useState } from 'react'

export default function MenuAccount() {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user.userInfo)
  const [email, setEmail] = useState<string>()

  useEffect(() => {
    setEmail(user.email)
  }, [])

  console.log(email)

  return (
    <div className="text-md font-semibold text-black py-4 px-7 flex gap-12 bg-white rounded-t-xl">
      <span>Thông tin định danh</span>
      <span onClick={() => router.push(`/account-info/${email}`)} className="hover:text-green-600">
        Thông tin tài khoản
      </span>
      <span onClick={() => router.push('/account-info/setupQR')} className="hover:text-green-600">
        Thông tin thiết lập mã QR
      </span>
    </div>
  )
}
