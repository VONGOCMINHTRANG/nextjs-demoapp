import { createSlice } from '@reduxjs/toolkit'
// Define a type for the slice state
import { ISidebarState } from '../../interfaces'

// Define the initial state using that type
const initialState: ISidebarState = {
  sidebarState: false,
}

export const sidebarSlice: any = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebarState = action.payload
    },
  },
})

export const { setSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
