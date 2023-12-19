import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { fullname: "", id: "" },
  },
  reducers: {
    login: (state, action) => {
      console.log(state.user.id);
      console.log(action.payload._id);
      state.user = {
        ...state.user,
        fullname: action.payload.fullname,
        id: action.payload._id,
      };
      console.log(state.user);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions;

export default userSlice.reducer;
