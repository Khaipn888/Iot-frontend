import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/user'
import roomReducer from './reducer/room'

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  }
})