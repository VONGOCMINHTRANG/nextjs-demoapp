import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth } from '../../../config/firebase'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setUserInfo } from '../../redux/slice/userSlice'

export default function SignIn() {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
  })
  const router = useRouter()
  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onBlur',
  })
  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignIn = async () => {
    if (!isValid) return
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password)
      const data = {
        email: values.email,
      }
      const dataRedux = {
        email: values.email,
        password: values.password,
      }
      if (localStorage.getItem('user') === null) {
        localStorage.setItem('user', JSON.stringify(data))
      }

      dispatch(setUserInfo(dataRedux))
      router.push(`/account-info/${values.email}`)
      Swal.fire('Welcome back!', '', 'success')
    } catch (error: any) {
      console.log('error >> ', error)
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
          title: 'Please enter your password!',
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
      if (error.code === ' auth/wrong-password') {
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
    }
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign in</h1>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-600 text-white focus:outline-none my-1"
            >
              Sign in
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Create an Account?
          <a className="no-underline border-b border-blue text-blue" href="/signup">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
