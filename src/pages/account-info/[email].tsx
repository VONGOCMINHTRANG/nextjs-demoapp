import Head from 'next/head'
import Layout from '../../components/layouts'
import { IoIosArrowBack } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Blur from '../../components/blur'
import ChangePassword from '../../components/change-password'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { setToggle } from '../../redux/slice/toggleSlice'
import MenuAccount from '../../components/menu/menuAccount'
import { useAuth } from '../../context/auth-context'

export default function AccountInFormation() {
  const { userInfo } = useAuth()
  const [data, setData] = useState([])
  const toggle = useSelector((state: any) => state.toggle.toggleState)
  const dispatch = useDispatch()
  const [id, setId] = useState<string>('')

  useEffect(() => {
    if (!userInfo) return
    // console.log(JSON.parse(localStorage.getItem('userInfo') || '{}').email)
    const userEmail = JSON.parse(localStorage.getItem('userInfo') || '{}').email

    try {
      const docRef = query(collection(db, 'users'), where('email', '==', userEmail))

      onSnapshot(docRef, (snapshot) => {
        let results: any = []
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
          setData(results)
          data.forEach((item: any) => {
            setId(item.id)
          })
        })
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="flex flex-col cursor-pointer w-full">
      <div className="mb-6 flex items-center text-green-500 font-medium">
        <IoIosArrowBack className="w-6 h-6" />
        <span>Trở về cài đặt</span>
      </div>
      <div className="flex w-full flex-col">
        <MenuAccount></MenuAccount>
        <hr />

        <div className="flex items-center bg-[#f7faff] h-auto rounded-b-xl">
          <div className="bg-white my-6 w-5/6 md:w-4/6 mx-auto rounded-xl">
            <div className="px-7 flex justify-between py-3 flex-col md:flex-row gap-y-5 md:gap-y-0">
              <div className="flex md:items-center gap-1 flex-col md:flex-row">
                <span className="font-medium text-black flex items-center">
                  Thông tin tài khoản <span className="hidden md:block">-</span>
                </span>

                <div className="text-sm text-black/80 flex gap-2 whitespace-nowrap">
                  Mã tài khoản:
                  <span>{id.slice(0, 10)}</span>
                </div>
              </div>

              <div
                className="text-sm text-green-600 font-medium cursor-pointer whitespace-nowrap flex justify-end"
                onClick={() => dispatch(setToggle(true))}
              >
                Đổi mật khẩu
              </div>

              {toggle && <Blur onClick={() => dispatch(setToggle(false))}></Blur>}
              {toggle && (
                <ChangePassword onClick={() => dispatch(setToggle(false))}></ChangePassword>
              )}
            </div>
            <hr />
            <div className="px-12 md:px-24 py-5">
              <ul>
                <li className="flex flex-col md:flex-row justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Tên tài khoản</span>
                  <div className="flex gap-3">
                    <span className="text-black/70 font-medium">{userInfo?.fullname}</span>
                    <FaRegEdit className="w-5 h-5 text-green-500" />
                  </div>
                </li>
                <li className="flex flex-col md:flex-row justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Email</span>
                  <div className="flex gap-3">
                    <span className="text-gray-500 font-medium">{userInfo?.email}</span>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Số điện thoại (Tài khoản mặc định)</span>
                  <div className="flex gap-3">
                    <span className="text-black/70 font-medium">0123456789</span>
                  </div>
                </li>
                <li className="flex flex-col md:flex-row justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Quyền</span>
                  <div className="flex gap-3">
                    <span className="text-black/70 font-medium">Chủ doanh nghiệp</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AccountInFormation.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      {/* <Head>
        <title>PayMe Dashboard</title>
      </Head> */}
      {page}
    </Layout>
  )
}
