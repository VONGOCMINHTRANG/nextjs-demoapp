import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
  userInfo: {
    email: string
    password: string
  }
}

// Define the initial state using that type
const initialState: UserState = {
  userInfo: {
    email: '',
    password: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const { setUserInfo } = userSlice.actions
export default userSlice.reducer
