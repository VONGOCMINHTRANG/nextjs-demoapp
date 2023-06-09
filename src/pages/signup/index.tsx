import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from '@firebase/auth'
import { auth, db } from '../../../config/firebase'
import { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import LoadingSkeleton from '../../components/loading-skeleton'
import Image from 'next/image'
import Logo from '../../../assets/images/logo.svg'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import useCheckLoggedIn from '../../hooks/useCheckLoggedIn'
import Button from '../../components/button'

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false)
  const [, setUserInfo] = useState('')
  const router = useRouter()
  const { checkLogged } = useCheckLoggedIn()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
  })

  const handleCreateUser = async (values: any) => {
    if (!isValid) return
    try {
      setLoading(true)
      const credentials: any = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      await updateProfile(auth.currentUser as any, {
        displayName: values.fullname,
      })
      setUserInfo(credentials)

      const userRef = collection(db, 'users')
      await addDoc(userRef, {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        id: credentials.user.uid,
      })
      router.push(`/account-info/${values.email}`)
      setLoading(false)
      Swal.fire('Congratulation!', 'Your accounted has been created successfully.', 'success')
    } catch (error: any) {
      if (values.fullname == '') {
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
          title: 'Please enter your fullname',
        })
      }
      if (error.code === 'auth/email-already-in-use') {
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
          title: 'Sorry!Your email already in use!',
        })
      }
      if (error.code === 'auth/invalid-email') {
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
          title: 'Please enter an valid email!',
        })
      }
      if (error.code === 'auth/missing-password') {
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
          title: 'Your password is not correct!',
        })
      }
      if (error.code === 'auth/weak-password') {
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
          title: 'Password should be at least 6 characters!',
        })
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        setUserInfo(currentUser)
      } else {
        setUserInfo('')
      }
    })
  }, [])

  return (
    <>
      {!loading && !checkLogged && (
        <div className="bg-grey-lighter min-h-screen flex flex-col bg-gray-100">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-4 rounded shadow-md text-black w-full">
              <div className="py-4">
                <Image src={Logo} alt="logo" className="w-32" />
              </div>
              <h1 className="mb-8 text-2xl text-center font-medium">Sign up</h1>
              <form onSubmit={handleSubmit(handleCreateUser)} id="signup">
                <div className="mb-4">
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-1 outline-none focus:ring-1"
                    placeholder="Full name"
                    {...register('fullname', { required: true })}
                  />
                  {errors?.fullname?.type === 'required' && (
                    <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Email"
                    {...register('email', { required: true })}
                  />
                  {errors?.email?.type === 'required' && (
                    <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Password"
                    {...register('password', { required: true, minLength: 6 })}
                  />
                  {errors?.password?.type === 'required' && (
                    <div className="text-red-500 text-xs italic">Vui lòng không bỏ trống</div>
                  )}
                  {errors?.password?.type === 'minLength' && (
                    <div className="text-red-500 text-xs italic">
                      Mật khẩu phải gồm ít nhất 6 ký tự
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
                >
                  Create Account
                </Button>
              </form>
            </div>

            <Link href="/signin" className="text-black mt-6 text-sm italic">
              Already have an account? <span className="text-green-600">Sign in</span>
            </Link>
          </div>
        </div>
      )}
      {loading && <LoadingSkeleton></LoadingSkeleton>}
    </>
  )
}
