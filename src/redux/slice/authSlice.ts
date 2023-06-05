import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// Define a type for the slice state
import { IAuthState, ILoginPayload, IUser } from '../../interfaces'

const initialState: IAuthState = {
  isLoggedIn: false,
  loadingLogging: false,
  currentUser: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILoginPayload>) {
      state.loadingLogging = true
    },
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true
      state.loadingLogging = false
      state.currentUser = action.payload
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loadingLogging = false
    },
    logout(state) {
      state.isLoggedIn = false
      state.currentUser = undefined
    },
  },
})

// Actions
export const { login, loginSuccess, loginFailed, logout } = authSlice.actions
export default authSlice.reducer
