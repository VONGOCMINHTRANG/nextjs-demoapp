import { BsFillPersonFill } from 'react-icons/bs'
import { FaKey } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import useClickOutsite from '../../hooks/useClickOutside'

export default function MenuUser() {
  const { show, nodeRef } = useClickOutsite()
  console.log('nodeRef >>', nodeRef)

  return (
    <>
      {show && (
        <div className="absolute bg-white right-0 mx-8 shadow-md mt-5 rounded-md" ref={nodeRef}>
          <ul className="p-2 text-base text-gray-500 font-semibold px-5">
            <li className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5">
              <BsFillPersonFill />
              <span>Thông tin tài khoản</span>
            </li>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5">
              <FaKey />
              <span>Đổi mật khẩu</span>
            </li>

            <li className="flex items-center gap-4 cursor-pointer hover:bg-green-50 hover:rounded-md p-2.5">
              <HiOutlineLogout />
              <span>Đăng xuất</span>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
