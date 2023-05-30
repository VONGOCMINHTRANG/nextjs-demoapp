import Head from 'next/head'
import Layout from '../../components/layouts'
import { IoIosArrowBack } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { useState } from 'react'
import Blur from '../../components/blur'
import ChangePassword from '../../components/change-password'

export default function AccountInFormation() {
  const [changePW, setChangePW] = useState<boolean>(false)

  return (
    <div className="flex flex-col flex-1 cursor-pointer">
      <div className="mb-6 flex items-center text-green-500 font-medium">
        <IoIosArrowBack className="w-6 h-6" />
        <span>Trở về cài đặt</span>
      </div>
      <div className="flex flex-1 w-full flex-col">
        <div className="text-md font-semibold text-black py-4 px-7 flex gap-12 bg-white rounded-t-xl">
          <span>Thông tin định danh</span>
          <span>Thông tin tài khoản</span>
        </div>

        <hr />

        <div className="flex items-center flex-col bg-[#f7faff] h-auto rounded-b-xl">
          <div className="bg-white my-6 w-4/6">
            <div className="px-7 flex justify-between py-3">
              <div className="flex items-center gap-1">
                <span className="font-medium text-black">Thông tin tài khoản -</span>
                <div className="text-sm text-black/80">
                  Mã tài khoản: <span className="text-black/70">1234567890</span>
                </div>
              </div>

              <div
                className="text-sm text-green-500 cursor-pointer"
                onClick={() => setChangePW(true)}
              >
                Đổi mật khẩu
              </div>

              {changePW && <Blur onClick={() => setChangePW(false)}></Blur>}

              {changePW && <ChangePassword onClick={() => setChangePW(false)}></ChangePassword>}
            </div>
            <hr />
            <div className="px-32 py-5">
              <ul>
                <li className="flex justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Tên tài khoản</span>
                  <div className="flex gap-3">
                    <span className="text-black">PayME</span>
                    <FaRegEdit className="w-5 h-5 text-green-500" />
                  </div>
                </li>
                <li className="flex justify-between text-sm border-dotted border-b-2 py-3">
                  <span className="text-gray-400">Email</span>
                  <div className="flex gap-3">
                    <span className="text-gray-400">payme@gmail.com</span>
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
      <Head>
        <title>Account Information</title>
      </Head>
      {page}
    </Layout>
  )
}
