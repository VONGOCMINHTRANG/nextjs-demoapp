import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ToggleState {
  toggleState: boolean
}

// Define the initial state using that type
const initialState: ToggleState = {
  toggleState: false,
}

export const userSlice = createSlice({
  name: 'toggle',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggleState = action.payload
    },
  },
})

export const { setToggle } = userSlice.actions
export default userSlice.reducer
