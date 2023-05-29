import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from '@firebase/auth'
import { auth, db } from '../../../config/firebase'
import { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { useRouter } from 'next/router'

export default function SignUp() {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const [userInfo, setUserInfo] = useState('')
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

      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      })
      setUserInfo(credentials)

      const userRef = collection(db, 'users')
      await addDoc(userRef, {
        email: values.email,
        password: values.password,
        id: credentials.user.uid,
      })

      // console.log(userInfo);
      // console.log("handleCreateUser ~ user", user);
      router.push('/')
      console.log('Create user successfully')
    } catch (error) {
      console.log(error)
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
