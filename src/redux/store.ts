import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import toggleReducer from '../redux/slice/toggleSlice'
import sidebarReducer from '../redux/slice/sidebarSlice'
import authReducer from '../redux/slice/authSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSga'

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
