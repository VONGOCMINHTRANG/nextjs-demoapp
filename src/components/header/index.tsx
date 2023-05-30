import Image from 'next/image'
import VietNamImage from '../../../assets/images/vietnam.avif'
import { BsPersonCircle, BsShop, BsCheckCircleFill } from 'react-icons/bs'
import MenuUser from '../menu/menuUser'
import { useState } from 'react'
import MenuLanguage from '../menu/menuLanguage'

export default function Header() {
  const [openUser, setOpenUser] = useState<boolean>(false)
  const [openLanguage, setOpenLanguage] = useState<boolean>(false)
  // console.log('openUser >>', openUser)

  return (
    <div className="bg-white shadow-md py-3 w-full fixed h-16 z-30">
      <div className="px-6 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="rounded-xl w-10 h-10 items-center justify-center flex bg-gray-200">
            <BsShop className="w-6 h-6 text-gray-300" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-semibold text-black">TK CỦA PAYME</span>
              <BsCheckCircleFill className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-xs font-semibold text-gray-400">MID : 123456</span>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <Image
            src={VietNamImage}
            alt=""
            className="w-5 h-5 rounded-full cursor-pointer relative"
            onClick={() => setOpenLanguage(!openLanguage)}
          />

          <BsPersonCircle
            className="w-8 h-8 text-gray-600 cursor-pointer"
            onClick={() => setOpenUser(true)}
          />
        </div>
      </div>

      {openUser && <MenuUser />}
      {openLanguage && <MenuLanguage />}
    </div>
  )
}
