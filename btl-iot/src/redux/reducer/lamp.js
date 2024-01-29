import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCreateLamp } from "../../apis/lamp";

export const lampSlice = createSlice({
  name: "lamp",
  initialState: {
    lamp: {}
  },
  reducers: {
    setLamp: (state, action) => {
      console.log("set lamp reducer");
      state.lamp = action.payload;
      console.log(state.lamp);
    }, 
    deleteLamp: (state, action) => {
      state.room = state.roomsInfo.filter(item => item.room.roomId !== action.payload);
    },
  },
});



// Action creators are generated for each case reducer function
export const { setLamp, deleteLamp } = lampSlice.actions;

export default lampSlice.reducer;
