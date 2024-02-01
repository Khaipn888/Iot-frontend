import React, { useEffect, useState } from "react";
import LeftBar from "../components/LeftBar";
import { apiGetDetail } from "../apis/room";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "../redux/reducer/room";
import Lamp from "../components/Lamp";
import Window from "../components/Window";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { apiCreateLamp } from "../apis/lamp";
import { apiCreateWindow } from "../apis/window";
import Chart from "../components/Chart";

const RoomDetail = () => {
  const { roomId } = useParams();
  console.log(roomId);
  const dispatch = useDispatch();
  useEffect(() => {
    apiGetDetail(roomId)
      .then((res) => dispatch(setRoom(res.data)))
      .catch((err) => console.log(err));
  }, []);
  const room = useSelector((state) => state.room.currentRoom);
  console.log(room);

  // modal add lamp
  const lampOrder = ["1", "2"];
  const windowOrder = ["1", "2"];
  const [openModalLamp, setOpenModalLamp] = useState(false);
  const handleOpenModalLamp = () => setOpenModalLamp(true);
  const handleCloseModalLamp = () => setOpenModalLamp(false);
  const [newLamp, setNewLamp] = useState({
    name: "",
    roomId: "",
    lampOrder: "",
  });

  const [openModalWindow, setOpenModalWindow] = useState(false);
  const handleOpenModalWindow = () => setOpenModalWindow(true);
  const handleCloseModalWindow = () => setOpenModalWindow(false);
  const [newWindow, setNewWindow] = useState({
    name: "",
    roomId: "",
    windowOrder: "",
    height: "",
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
  const handleChangeInfoNewLamp = (e) => {
    const newLampCpy = { ...newLamp };
    newLampCpy[e.target.name] = e.target.value;
    setNewLamp(newLampCpy);
  };

  const addLamp = () => {
    const newLampCpy = { ...newLamp };
    newLampCpy.roomId = roomId;
    setNewLamp(newLampCpy);
    apiCreateLamp(newLampCpy);
    setTimeout(() => {
      apiGetDetail(roomId)
        .then((res) => dispatch(setRoom(res.data)))
        .catch((err) => console.log(err));
    }, 500);
    handleCloseModalLamp();
  };
  // ----------

  const handleChangeInfoNewWindow = (e) => {
    const newWindowCpy = { ...newWindow };
    newWindowCpy[e.target.name] = e.target.value;
    setNewWindow(newWindowCpy);
  };

  const addWindow = () => {
    const newWindowCpy = { ...newWindow };
    newWindowCpy.roomId = roomId;
    setNewWindow(newWindowCpy);
    apiCreateWindow(newWindowCpy);
    setTimeout(() => {
      apiGetDetail(roomId)
        .then((res) => dispatch(setRoom(res.data)))
        .catch((err) => console.log(err));
    }, 500);
    handleCloseModalWindow();
  };

  return (
    <div className="row mx-0">
      <LeftBar />
      <div className=" col-2 p-0"></div>
      <div className=" col-10 p-5 ps-0 pt-2">
        <div className="">
          <div className="display-6 text-center fw-bold mb-2">
            {room?.room?.name}
          </div>
          <div className="w-100 h-100 p-4 pb-0">
            <div className="chart">
              <Chart />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-6 p-4 shadow ">
            <button
              className="btn btn-outline-success fw-bold "
              onClick={handleOpenModalLamp}
            >
              Thêm đèn
            </button>
            <Modal
              open={openModalLamp}
              onClose={handleCloseModalLamp}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {room?.lamps?.length < 2 ? (
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h1"
                    className="text-center fw-bold"
                  >
                    Thêm đèn mới
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="d-flex justify-content-between mb-3 ">
                      <label htmlFor="name" className="fw-bold">
                        Tên Đèn:
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="input-addroom"
                        onChange={handleChangeInfoNewLamp}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3 ">
                      <label htmlFor="name" className="fw-bold">
                        Vị trí:
                      </label>
                      <select
                        name="lampOrder"
                        id="lampsOrder"
                        className="border-0 "
                        onChange={handleChangeInfoNewLamp}
                      >
                        <option value="" disabled selected>
                          Chọn vị trí chân đèn
                        </option>
                        {lampOrder.map((item) => {
                          if (room?.room?.connectedLamp.indexOf(item) === -1)
                            return (
                              <option value={item} key={item}>
                                {item}
                              </option>
                            );
                        })}
                      </select>
                    </div>
                  </Typography>
                  <div className="mt-5 d-flex justify-content-around ">
                    <button
                      className="btn btn-danger py-1"
                      onClick={handleCloseModalLamp}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success py-1" onClick={addLamp}>
                      Ok
                    </button>
                  </div>
                </Box>
              ) : (
                <Box
                  sx={style}
                  className="d-flex align-items-center justify-content-center"
                >
                  <p className="m-0 fw-bold text-warning">
                    Số đèn đã đạt số lượng tối đa
                  </p>
                </Box>
              )}
            </Modal>
            <div className="list pt-2 ">
              {room?.lamps?.length > 0 &&
                room.lamps.map((item) => (
                  <Lamp
                    name={item.name}
                    lampId={item.lampId}
                    mode={item.mode}
                    key={item.lampId}
                    status={item.status}
                    breakpoint={item.breakpoint}
                    timers={item.timers}
                    roomId={roomId}
                  />
                ))}
            </div>
          </div>
          <div className="col-6 p-4 shadow">
            <button
              className="btn btn-outline-success fw-bold "
              onClick={handleOpenModalWindow}
            >
              Thêm rèm
            </button>
            <Modal
              open={openModalWindow}
              onClose={handleCloseModalWindow}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              {room?.windows?.length < 2 ? (
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h1"
                    className="text-center fw-bold"
                  >
                    Thêm rèm mới
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="d-flex justify-content-between mb-3 ">
                      <label htmlFor="name" className="fw-bold">
                        Tên Rèm:
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="input-addroom"
                        onChange={handleChangeInfoNewWindow}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3 ">
                      <label htmlFor="height" className="fw-bold">
                        {` Chiều cao(cm): `}
                      </label>
                      <input
                        name="height"
                        id="height"
                        type="text"
                        className="input-addroom"
                        onChange={handleChangeInfoNewWindow}
                      />
                    </div>
                    <div className="d-flex justify-content-between mb-3 ">
                      <label htmlFor="windowOrder" className="fw-bold">
                        Vị trí:
                      </label>
                      <select
                        name="windowOrder"
                        id="windowOrder"
                        className="border-0 "
                        onChange={handleChangeInfoNewWindow}
                      >
                        <option value="" disabled selected>
                          Chọn vị trí chân rèm
                        </option>
                        {windowOrder.map((item) => {
                          if (room?.room?.connectedWindow.indexOf(item) === -1)
                            return (
                              <option value={item} key={item}>
                                {item}
                              </option>
                            );
                        })}
                      </select>
                    </div>
                  </Typography>
                  <div className="mt-5 d-flex justify-content-around ">
                    <button
                      className="btn btn-danger py-1"
                      onClick={handleCloseModalWindow}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success py-1"
                      onClick={addWindow}
                    >
                      Ok
                    </button>
                  </div>
                </Box>
              ) : (
                <Box
                  sx={style}
                  className="d-flex align-items-center justify-content-center"
                >
                  <p className="m-0 fw-bold text-warning">
                    Số rèm cửa đã đạt số lượng tối đa
                  </p>
                </Box>
              )}
            </Modal>
            <div className="list pt-2 ">
              {room?.windows?.length > 0 &&
                room.windows.map((item) => (
                  <Window
                    name={item.name}
                    windowId={item.windowId}
                    mode={item.mode}
                    key={item.windowId}
                    status={item.status}
                    height={item.height}
                    breakpoints={item.breakpoints}
                    timers={item.timers}
                    roomId={roomId}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
