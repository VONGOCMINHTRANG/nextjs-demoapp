import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from '@firebase/auth'
import { auth, db } from '../../../config/firebase'
import { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export default function SignUp() {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const [, setUserInfo] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
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
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleCreateUser} id="signup">
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              onChange={handleInputChange}
            />
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
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a className="no-underline border-b border-blue text-blue" href="/signin">
            Sign in
          </a>
          .
        </div>
      </div>
    </div>
  )
}
