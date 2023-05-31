import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { GrClose } from 'react-icons/gr'
import { IChangePW } from '../../interfaces'
import { getAuth, signOut, updatePassword } from '@firebase/auth'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'

export default function ChangePassword({ onClick = () => {} }: IChangePW): any {
  const [portalDiv, setPortalDiv] = useState<Element | DocumentFragment | null>()

  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: { oldPassword: '', newPassword: '', retypePassword: '' },
  })

  const handleUpdatePassword = async (values: any) => {
    console.log(values)
    if (values.newPassword != values.retypePassword) {
      console.log('success')
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'red',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      await Toast.fire({
        icon: 'error',
        title: `Your new password doesn't match!`,
      })
      return
    }

    // const auth = getAuth()
    // updatePassword(auth.currentUser as any, values.newPassword)
    //   .then(() => {
    //     console.log('success')
    //     // router.push('/signin')
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     if (error.code == 'auth/requires-recent-login') {
    //       signOut(auth)
    //       router.push('/signin')
    //     }
    //   })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalDiv(document.querySelector('body'))
    }
  }, [])

  // console.log(portalDiv)

  if (portalDiv) {
    return createPortal(
      <div className="flex justify-center">
        <div className="bg-white w-96 rounded-xl absolute z-50 flex flex-col top-12 transition-all">
          <div className="p-4 flex items-center justify-between">
            <span className="text-lg font-medium text-black">Đổi mật khẩu</span>
            <GrClose onClick={onClick} className="w-4 h-4 cursor-pointer" />
          </div>

          <div className="py-2 px-6">
            <form onSubmit={handleSubmit(handleUpdatePassword)}>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="text-sm">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Nhập mật khẩu hiện tại"
                  className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="text-sm">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Nhập mật khẩu mới"
                  className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5]"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="retypePassword" className="text-sm">
                  Nhập lại mật khẩu mới
                </label>
                <input
                  type="password"
                  name="retypePassword"
                  placeholder="Nhập lại mật khẩu mới"
                  className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5]"
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white w-full rounded-xl p-3 font-medium mt-4 mb-8"
              >
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>,
      portalDiv as Element | DocumentFragment
    )
  }
}
