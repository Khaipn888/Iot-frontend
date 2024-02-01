import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetAllRoom, apiGetDetail } from "../../apis/room";
import { useDispatch } from "react-redux";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    currentRoom: {},
    roomsInfo: [],
  },
  reducers: {
    setRoom: (state, action) => {
      state.currentRoom = action.payload;
    }, 
    deleteRoom: (state, action) => {
      state.roomsInfo = state.roomsInfo.filter(item => item.room.roomId !== action.payload);
    },
    deleteLamp: (state, action) => {
      state.currentRoom.lamps = state.currentRoom.lamps.filter(item => item.lampId !== action.payload);
    },
    deleteWindow: (state, action) => {
      state.currentRoom.windows = state.currentRoom.windows.filter(item => item.windowId !== action.payload);
    }
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
export const {setRoom, deleteRoom, deleteLamp, deleteWindow } = roomSlice.actions;

export default roomSlice.reducer;
