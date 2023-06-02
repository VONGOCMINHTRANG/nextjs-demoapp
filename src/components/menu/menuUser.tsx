import { signOut } from '@firebase/auth'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaKey } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { auth } from '../../../config/firebase'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle } from '../../redux/slice/toggleSlice'
import { useAuth } from '../../context/auth-context'
import { useEffect, useState } from 'react'
import Blur from '../blur'
import ChangePassword from '../change-password'

export default function MenuUser() {
  const { userInfo } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const toggle = useSelector((state: any) => state.toggle.toggleState)
  console.log('toggle >> ', toggle)

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userToken')
        Swal.fire('Logout successfully.', '', 'success')
        router.push('/signin')
      }
    })
  }

  useEffect(() => {
    if (!userInfo) router.push('/signin')
  }, [])

  return (
    <>
      <div className="absolute bg-white right-0 mx-8 shadow-md mt-5 rounded-md">
        <ul className="p-2 text-base text-gray-500 font-semibold px-5">
          <li
            onClick={() => router.push(`/account-info/${userInfo?.email}`)}
            className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5"
          >
            <BsFillPersonFill />
            <span>Thông tin tài khoản</span>
          </li>
          <li
            className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5"
            onClick={() => dispatch(setToggle(true))}
          >
            <FaKey />
            <span>Đổi mật khẩu</span>
          </li>

          <li
            className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5"
            onClick={handleSignOut}
          >
            <HiOutlineLogout />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </>
  )
}
