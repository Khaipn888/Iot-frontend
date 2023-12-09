import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
        id: "",
        token: "",
        name: "",
        email: "",
    }
  },
  reducers: {
    login: (state, action) => {
      state.user = {...action}
    }
  }
})

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions

export default userSlice.reducer