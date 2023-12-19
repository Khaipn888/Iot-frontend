import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LeftBar from "../components/LeftBar";
import Room from "../components/Room";
import { useSelector, useDispatch } from "react-redux";
import { roomsThunk, roomDetailThunk } from "../redux/reducer/room";

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const rooms = useSelector((state) => state.room.rooms);
  const user = useSelector((state) => state.user.user);
  const roomsInfo = useSelector((state) => state.room.roomsInfo);
  const dispatch = useDispatch();

  const removeDuplicates = (arr) => {
    const roomsIds = [];
    const roomsInfoNew = [];
    arr.forEach((item) => {
      if (!roomsIds.includes(item.room.roomId)) {
        roomsIds.push(item.room.roomId);
        roomsInfoNew.push(item);
      }
    });
    console.log(roomsInfoNew);
    return roomsInfoNew;
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(roomsThunk());
  }, []);

  useEffect(() => {
    rooms.forEach((room) => dispatch(roomDetailThunk(room.roomId)));
  }, [rooms]);

  return (
    <div className="row mx-0">
      <LeftBar />
      <div className=" col-2 p-0">
      </div>
      <div className="col-10 p-0">
        <div className="add-room pt-4 ps-5">
          <button className="btn btn-danger ">Thêm Phòng</button>
        </div>
        <div className="d-flex gap-5 w-100 flex-wrap p-5">
          {roomsInfo.length > 0 &&
            removeDuplicates(roomsInfo).map((item) => (
              <Room
                key={item.roomId}
                roomName={item.room.name}
                lamps={item.lamps}
                curtains={item.windows}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
