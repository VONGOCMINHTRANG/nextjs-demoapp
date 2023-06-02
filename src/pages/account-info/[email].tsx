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
        })
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="flex flex-col flex-1 cursor-pointer">
      <div className="mb-6 flex items-center text-green-500 font-medium">
        <IoIosArrowBack className="w-6 h-6" />
        <span>Trở về cài đặt</span>
      </div>
      <div className="flex flex-1 w-full flex-col">
        <MenuAccount></MenuAccount>
        <hr />

        <div className="flex items-center bg-[#f7faff] h-auto rounded-b-xl">
          <div className="bg-white my-6 w-4/6 mx-auto">
            <div className="px-7 flex justify-between py-3">
              <div className="flex items-center gap-1">
                <span className="font-medium text-black">Thông tin tài khoản -</span>

                <div className="text-sm text-black/80 flex gap-2">
                  Mã tài khoản:
                  {data.length > 0 &&
                    data?.map((item: any) => (
                      <span key={item?.id} className="text-black/70">
                        {item?.id}
                      </span>
                    ))}
                </div>
              </div>

              <div
                className="text-sm text-green-500 cursor-pointer"
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
            <div className="px-32 py-5">
              <ul>
                <li className="flex justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Tên tài khoản</span>
                  <div className="flex gap-3">
                    <span className="text-black">{userInfo?.fullname}</span>
                    <FaRegEdit className="w-5 h-5 text-green-500" />
                  </div>
                </li>
                <li className="flex justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Email</span>
                  <div className="flex gap-3">
                    <span className="text-gray-400">{userInfo?.email}</span>
                  </div>
                </li>
                <li className="flex justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Số điện thoại (Tài khoản mặc định)</span>
                  <div className="flex gap-3">
                    <span>0123456789</span>
                  </div>
                </li>
                <li className="flex justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Quyền</span>
                  <div className="flex gap-3">
                    <span>Chủ doanh nghiệp</span>
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
