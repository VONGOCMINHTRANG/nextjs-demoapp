import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth } from '../../../config/firebase'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import LoadingSkeleton from '../../components/loading-skeleton'
import Logo from '../../../assets/images/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import useCheckLoggedIn from '../../hooks/useCheckLoggedIn'
import Button from '../../components/button'

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false)
  const { checkLogged } = useCheckLoggedIn()
  const router = useRouter()
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

  const handleSignIn = async (values: any) => {
    if (!isValid) return
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, values.email, values.password)
      router.push(`/account-info/${values.email}`)
      Swal.fire('Welcome back!', '', 'success')
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      // console.log('error >> ', error)
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
      if (error.code === 'auth/wrong-password') {
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
          title: 'Your password is incorrect!',
        })
      }
      if (error.code === 'auth/user-not-found') {
        Swal.fire({
          title: 'Oops!',
          text: "We can't find your account!",
          icon: 'error',
        })
      }
    }
  }

  return (
    <>
      {!loading && !checkLogged && (
        <div className="bg-grey-lighter min-h-screen flex flex-col bg-gray-100">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-4 rounded shadow-md text-black w-full">
              <div className="py-4">
                <Image src={Logo} alt="logo" className="w-32" />
              </div>

              <h1 className="mb-8 text-2xl text-center font-medium">Sign in</h1>
              <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="mb-4">
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-1 outline-none focus:ring-1"
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
                    className="block border border-grey-light w-full p-3 rounded mb-1 outline-none focus:ring-1"
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
                  className="w-full text-center py-3 rounded bg-green-600 text-white focus:outline-none my-1"
                >
                  Sign in
                </Button>
              </form>
            </div>

            <Link href="/signup" className="text-black mt-6 text-sm italic">
              Create an Account? <span className="text-green-600">Sign up</span>
            </Link>
          </div>
        </div>
      )}
      {loading && <LoadingSkeleton></LoadingSkeleton>}
    </>
  )
}
