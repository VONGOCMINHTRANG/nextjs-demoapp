import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ToggleState {
  toggleState: boolean
}

// Define the initial state using that type
const initialState: ToggleState = {
  toggleState: false,
}

export const toggleSlice: any = createSlice({
  name: 'toggle',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggleState = action.payload
    },
  },
})

export const { setToggle } = toggleSlice.actions
export default toggleSlice.reducer
