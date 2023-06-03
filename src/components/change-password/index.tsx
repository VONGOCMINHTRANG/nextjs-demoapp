import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { GrClose } from 'react-icons/gr'
import { IChangePW } from '../../interfaces'
import { getAuth, signOut, updatePassword } from '@firebase/auth'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import LoadingSkeleton from '../loading-skeleton'

export default function ChangePassword({ onClick = () => {} }: IChangePW): any {
  const [portalDiv, setPortalDiv] = useState<Element | DocumentFragment | null>()
  const [userId, setuserId] = useState<string>('')
  const [userPass, setUserPass] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const auth = getAuth()

  const router = useRouter()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: { oldPassword: '', newPassword: '', retypePassword: '' },
  })

  const handleUpdatePassword = async (values: any) => {
    if (!isValid) return
    if (values.oldPassword !== userPass) {
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
        title: `Your current password is not correct!`,
      })
      return
    }
    if (values.newPassword != values.retypePassword) {
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

    try {
      setLoading(true)
      await updateDoc(doc(db, 'users', userId), {
        password: values.newPassword,
      })
        .then(() => {
          console.log(userPass)
        })
        .catch((error) => {
          console.log('String error >> ', error)
        })
      await updatePassword(auth.currentUser as any, values.newPassword)
        .then(() => {
          // dispatch(setUserInfo({}))
          localStorage.removeItem('userInfo')
          router.push('/signin')
          Swal.fire('Your password has been updated!', '', 'success')
        })
        .catch((error) => {
          // console.log(error)
          if (error.code == 'auth/requires-recent-login') {
            signOut(auth)
            router.push('/signin')
          }
        })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      Swal.fire({
        title: 'Oops!',
        text: 'Something went wrong!',
        icon: 'error',
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPortalDiv(document.querySelector('body'))
    }
    const userEmail = JSON.parse(localStorage.getItem('userInfo') || '{}').email

    try {
      const docRef = query(collection(db, 'users'), where('email', '==', userEmail))
      onSnapshot(docRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setUserPass(doc.data().password)
          setuserId(doc.id)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (portalDiv) {
    return createPortal(
      <>
        {!loading && (
          <div className="flex justify-center items-center">
            <div className="bg-white w-96 rounded-xl absolute z-50 flex flex-col top-1/2 translate-y-[-50%]  transition-all">
              <div className="p-4 flex items-center justify-between">
                <span className="text-lg font-medium text-black">Đổi mật khẩu</span>
                <GrClose onClick={onClick} className="w-4 h-4 cursor-pointer" />
              </div>

              <div className="py-2 px-6 flex">
                <form onSubmit={handleSubmit(handleUpdatePassword)}>
                  <div className="mb-4">
                    <label htmlFor="oldPassword" className="text-sm text-black">
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu hiện tại"
                      className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5] text-black"
                      {...register('oldPassword', { required: true, minLength: 6 })}
                    />
                    {errors?.oldPassword?.type === 'required' && (
                      <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                    )}
                    {errors?.oldPassword?.type === 'minLength' && (
                      <div className="text-red-500 text-xs italic">
                        Mật khẩu phải gồm ít nhất 6 ký tự
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="newPassword" className="text-sm text-black">
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5] text-black"
                      {...register('newPassword', { required: true, minLength: 6 })}
                    />
                    {errors?.newPassword?.type === 'required' && (
                      <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                    )}
                    {errors?.newPassword?.type === 'minLength' && (
                      <div className="text-red-500 text-xs italic">
                        Mật khẩu phải gồm ít nhất 6 ký tự
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="retypePassword" className="text-sm text-black">
                      Nhập lại mật khẩu mới
                    </label>
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu mới"
                      className="p-2 text-base w-full mt-2 outline-none rounded-lg bg-[#e6ebf5] text-black"
                      {...register('retypePassword', { required: true, minLength: 6 })}
                    />
                    {errors?.retypePassword?.type === 'required' && (
                      <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                    )}
                    {errors?.retypePassword?.type === 'minLength' && (
                      <div className="text-red-500 text-xs italic">
                        Mật khẩu phải gồm ít nhất 6 ký tự
                      </div>
                    )}
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
          </div>
        )}

        {loading && <LoadingSkeleton></LoadingSkeleton>}
      </>,

      portalDiv as Element | DocumentFragment
    )
  }
}
