import React, { useState } from "react";
import "../assets/styles/room.css";
const Room = ({ roomName, lamps, curtains }) => {
  const [room, setRoom] = useState({
    name: "",
    lamp: "",
    curtain: "",
    mode: "",
  });

  return (
    <div className="room-container rounded-2 shadow-lg bg-white p-3 ">
      <div className="d-flex justify-content-between ">
        <span className="">
          <h2>{roomName}</h2>
        </span>
        <div className="cursor-pointer">
          <ion-icon name="create"></ion-icon>
        </div>
      </div>
      <div className="info">
        <span className="d-flex">
          <p className="lamp w-50">{lamps.length} đèn</p>
          <p className="curtain w-50">{curtains.length} rèm cửa</p>
        </span>
        <div className="detail-mode d-flex">
          <div className="lamp-list w-50">
            {lamps.length > 0 &&
              lamps.map((lamp) => (
                <div className="">
                  <span>Đèn {lamp.name}: </span>
                  <span> {lamp.mode}</span>
                </div>
              ))}
          </div>
          <div className="curtain-list w-50">
            {curtains.length > 0 &&
              curtains.map((curtain) => (
                <div className="">
                  <span>Rèm cửa {curtain.name}: </span>
                  <span>{curtain.mode}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
