import Image from 'next/image'
import VietNamImage from '../../../assets/images/vietnam.avif'
import { BsPersonCircle, BsShop, BsCheckCircleFill } from 'react-icons/bs'
import MenuUser from '../menu/menuUser'
import { useEffect, useState } from 'react'
import MenuLanguage from '../menu/menuLanguage'
import { useRouter } from 'next/router'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import useClickUser from '../../hooks/useClickUser'
import useClickLanguage from '../../hooks/useClickLanguage'

export default function Header() {
  const [name, setName] = useState<string>('')
  const [openLanguage, setOpenLanguage] = useState<boolean>(false)
  const { showUser, userRef } = useClickUser()
  const { showLanguage, languageRef } = useClickLanguage()
  const router = useRouter()
  const emailUser = router.query.email

  useEffect(() => {
    try {
      if (!emailUser) return
      const docRef = query(collection(db, 'users'), where('email', '==', emailUser))
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setName(doc.data().fullname.toUpperCase())
        })
      })
    } catch (error) {
      console.log(error)
    }
  }, [emailUser])

  return (
    <div className="bg-white shadow-md py-3 w-full fixed h-16 z-30">
      <div className="px-6 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="rounded-xl w-10 h-10 items-center justify-center flex bg-gray-200">
            <BsShop className="w-6 h-6 text-gray-300" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-semibold text-black">TK CỦA {name}</span>
              <BsCheckCircleFill className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-xs font-semibold text-gray-400">MID : 123456</span>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <div className="w-5 h-5" ref={languageRef}>
            <Image
              src={VietNamImage}
              alt=""
              className="w-5 h-5 rounded-full cursor-pointer relative"
              onClick={() => setOpenLanguage(!openLanguage)}
            />
          </div>

          <div className="w-8 h-8" ref={userRef}>
            <BsPersonCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>

      {showUser && <MenuUser />}
      {showLanguage && <MenuLanguage />}
    </div>
  )
}
