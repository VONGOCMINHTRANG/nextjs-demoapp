import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from '../redux/slice/toggleSlice'
import sidebarReducer from '../redux/slice/sidebarSlice'

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    sidebar: sidebarReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
