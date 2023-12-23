import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LeftBar from "../components/LeftBar";
import Room from "../components/Room";
import { useSelector, useDispatch } from "react-redux";
import { roomsThunk, roomDetailThunk } from "../redux/reducer/room";
import { apiCreateRoom } from "../apis/room";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../assets/styles/room.css";
import RoomChart from "../components/RoomChart";

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const rooms = useSelector((state) => state.room.rooms);
  const user = useSelector((state) => state.user.user);
  const roomsInfo = useSelector((state) => state.room.roomsInfo);
  const dispatch = useDispatch();

  // modal add room

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    roomId: "",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // ----------
  const handleChangeInfoNewRoom = (e) => {
    const newRoomCpy = { ...newRoom };
    newRoomCpy[e.target.name] = e.target.value;
    setNewRoom(newRoomCpy);
  };
  const addRoom = () => {
    apiCreateRoom(newRoom);
    handleCloseModal();
  };
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
      <div className=" col-2 p-0"></div>
      <div className="col-10 p-0">
        <RoomChart/>
        <div className="add-room pt-4 ps-5">
          <button className="btn btn-danger " onClick={handleOpenModal}>
            Thêm Phòng
          </button>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h1"
                className="text-center fw-bold"
              >
                Tạo phòng mới
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="d-flex justify-content-between mb-3 ">
                  <label htmlFor="name" className="fw-bold">
                    Tên phòng:
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="input-addroom"
                    onChange={handleChangeInfoNewRoom}
                  />
                </div>
                <div className="d-flex justify-content-between ">
                  <label htmlFor="id" className="fw-bold">
                    ID phòng:
                  </label>
                  <input
                    name="roomId"
                    id="id"
                    type="text"
                    className="input-addroom"
                    onChange={handleChangeInfoNewRoom}
                  />
                </div>
              </Typography>
              <div className="mt-5 d-flex justify-content-around ">
                <button
                  className="btn btn-danger py-1"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button className="btn btn-success py-1" onClick={addRoom}>
                  Ok
                </button>
              </div>
            </Box>
          </Modal>
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
