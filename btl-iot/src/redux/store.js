import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/user'
import roomReducer from './reducer/room'
import lampReducer from './reducer/lamp'

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    lamp: lampReducer,
  }
})