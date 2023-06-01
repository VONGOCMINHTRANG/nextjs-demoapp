import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useState, createContext, useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'

const AuthContext = createContext()
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState([])
  const value = { userInfo, setUserInfo }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, email, uid } = user
        const docRef = query(collection(db, 'users'), where('email', '==', user.email))
        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo({
              ...user,
              ...doc.data(),
            })
          })
        })

        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            email: email,
            userId: uid,
            token: accessToken,
          })
        )
      }
    })
  }, [])

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
