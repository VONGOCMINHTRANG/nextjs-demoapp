import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
  fullname: string
  email: string
  password: string
}

// Define the initial state using that type
const initialState: UserState = {
  fullname: '',
  email: '',
  password: '',
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action) => {},
  },
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
