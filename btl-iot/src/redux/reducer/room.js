import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllRoom, apiGetDetail } from "../../apis/room";
import { useDispatch } from "react-redux";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    currentRoom: {
      room: { connect: [], roomId: "", user: "", name: "" },
      lamps: [],
      windows: [],
    },
    roomsInfo: [],
  },
  reducers: {
    resetRoomsInfo: (state) => {

    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(roomsThunk.pending, (state, action) => {
        console.log("pending rooms");
      })
      .addCase(roomsThunk.fulfilled, (state, action) => {
        state.rooms = action.payload.rooms;
      })
      .addCase(roomsThunk.rejected, (state, action) => {
        console.log("rejected rooms");
      })
      .addCase(roomDetailThunk.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(roomDetailThunk.fulfilled, (state, action) => {
        state.roomsInfo = [...state.roomsInfo, action.payload.data];
      })
      .addCase(roomDetailThunk.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const roomsThunk = createAsyncThunk("rooms", apiGetAllRoom);
export const roomDetailThunk = createAsyncThunk("roomsDetail", (id) =>
  apiGetDetail(id)
);

// Action creators are generated for each case reducer function
export const {resetRoomsInfo } = roomSlice.actions;

export default roomSlice.reducer;
