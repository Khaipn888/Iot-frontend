import React, { useState } from "react";
import "../assets/styles/room.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { apiDeleteRoom } from "../apis/room";

const Room = ({ roomId, roomName, lamps, curtains }) => {
  const [room, setRoom] = useState({
    name: "",
    lamp: "",
    curtain: "",
    mode: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDeleteRoom = () => {
    console.log("room id: ", roomId);
    apiDeleteRoom(roomId);
    handleClose();
  }
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="room-container rounded-2 shadow-lg bg-white p-3 ">
      <div className="d-flex justify-content-between ">
        <span className="">
          <h2>{roomName}</h2>
        </span>
        <div className="cursor-pointer gap-2">
          <button className="btn btn-outline-info py-0 mx-1">Xem</button>
          <button className="btn btn-outline-danger py-0 mx-1" onClick={handleClickOpen}>
        Xóa
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to delete ${roomName} ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteRoom}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
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
