import React, { useState } from "react";
import "../assets/styles/lamp.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { alpha, styled } from "@mui/material/styles";
import { pink, red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import {
  apiChangeBreakpoint,
  apiChangeMode,
  apiControlManual,
  apiDeleteLamp,
  apiChangeTimer,
} from "../apis/lamp";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { deleteLamp } from "../redux/reducer/room";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Timer from "./Timer";

function valuetext(value) {
  return `${value}cd`;
}

const Lamp = ({ name, mode, lampId, status, breakpoint, timers }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteLamp = () => {
    apiDeleteLamp(lampId)
      .then(() => dispatch(deleteLamp(lampId)))
      .catch((err) => console.log(err));
    handleClose();
  };
  // handle toggle
  const [alignment, setAlignment] = useState(mode);

  const handleChangeButtonToggle = (event) => {
    setAlignment(event.target.value);
    apiChangeMode(lampId, event.target.value);
  };

  // handle toggle switch on-off
  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: red["A400"],
      "&:hover": {
        backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: red[600],
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const [lampStatus, setLampStatus] = useState(status);
  const handleChangeStatus = (event) => {
    setLampStatus(event.target.checked);
    apiControlManual(lampId, event.target.checked);
  };

  // handle change breakpoint
  const marks = [
    {
      value: 0,
      label: "0cd",
    },
    {
      value: 5000,
      label: "5000",
    },
    {
      value: 10000,
      label: "10000",
    },
    {
      value: 50000,
      label: "50000cd",
    },
  ];
  const [breakpointValue, setBreakpointValue] = useState(breakpoint);
  const changeBreakpoint = (event) => {
    setBreakpointValue(event.target.value);
    apiChangeBreakpoint(lampId, event.target.value);
  };
  // handle timer mode
  const [timeOn, setTimeOn] = useState(dayjs("2022-04-17T15:30"));
  const [timeOff, setTimeOff] = useState(dayjs("2022-04-17T15:30"));
  const [lampTimers, setLampTimers] = useState(timers);

  const handleListTimers = (list) => {
    const listTimersCpy = [];
    let listCpy = [];
    list.forEach((item) => {
      item = item.slice(0, -2);
      if (listCpy.length === 1) {
        listCpy.push(item);
        listTimersCpy.push(listCpy);
        listCpy = [];
      } else {
        listCpy.push(item);
      }
    });
    return listTimersCpy;
  };
  const [listTimers, setListTimers] = useState(handleListTimers(timers));

  const saveTime = () => {
    const lampTimersCpy = [...lampTimers];
    lampTimersCpy.push(timeOn.format("HH:mm") + "-1");
    lampTimersCpy.push(timeOff.format("HH:mm") + "-0");
    setLampTimers(lampTimersCpy);
    setListTimers(handleListTimers(lampTimersCpy));
    //api change timer
    apiChangeTimer(lampId, lampTimersCpy);
  };

  const handleChangeTimerBack = (arr) => {
    const timersCpy = [];
    arr.forEach((item) => {
      item.forEach((time) => timersCpy.push(time));
    });
    setLampTimers(timersCpy);
    return timersCpy;
  };

  const deleteTimer = (index) => {
    let listTimerCpy = [...listTimers];
    listTimerCpy = listTimerCpy.filter(
      (item) => listTimerCpy.indexOf(item) !== index
    );
    setListTimers(listTimerCpy);
    const timersCpy = handleChangeTimerBack(listTimerCpy);
    apiChangeTimer(lampId, timersCpy);
  };

  return (
    <div className="lamp-container rounded-2 shadow-lg bg-white py-2 px-4 my-2 position-relative">
      <p className="d-flex justify-content-between">
        <span className="fw-bold fs-5">{name}</span>
        <span>
          <ToggleButtonGroup
            color="error"
            value={alignment}
            exclusive
            onChange={handleChangeButtonToggle}
            aria-label="Platform"
          >
            <ToggleButton className="p-1" value="manual">
              Manual
            </ToggleButton>
            <ToggleButton className="p-1" value="auto">
              Auto
            </ToggleButton>
            <ToggleButton className="p-1" value="timer">
              Timer
            </ToggleButton>
          </ToggleButtonGroup>
        </span>
        <div className="">
          <button
            className="btn btn-outline-danger py-0 mx-1"
            onClick={handleClickOpen}
          >
            Xóa
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Do you want to delete ${name} ?`}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleDeleteLamp}>Yes</Button>
              <Button onClick={handleClose} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </p>
      {alignment === "manual" && (
        <p>
          <PinkSwitch
            checked={lampStatus}
            {...label}
            onChange={handleChangeStatus}
          />
        </p>
      )}
      {alignment === "auto" && (
        <div className="auto-mode ">
          <Box>
            <Slider
              aria-label="Always visible"
              defaultValue={breakpoint}
              getAriaValueText={valuetext}
              step={5000}
              marks={marks}
              valueLabelDisplay="off"
              max={50000}
              min={0}
              onChange={changeBreakpoint}
              color="error"
            />
          </Box>
          <p className="fw-bold">
            Đèn sẽ bật/tắt khi cường độ ánh sáng bé hơn/lớn hơn
            <span className="text-danger"> {breakpointValue}cd</span>
          </p>
        </div>
      )}
      {alignment === "timer" && (
        <div>
          <p className="timer d-flex justify-content-between align-items-center ">
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <TimePicker
                    label="Time On"
                    value={timeOn}
                    onChange={(newValue) => setTimeOn(newValue)}
                  />
                  <TimePicker
                    label="Time Off"
                    value={timeOff}
                    onChange={(newValue) => setTimeOff(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <button className="btn btn-outline-danger ms-2" onClick={saveTime}>
              Save
            </button>
          </p>
          <div className="timer-list pe-5">
            {listTimers?.map((item) => (
              <Timer
                key={listTimers.indexOf(item)}
                index={listTimers.indexOf(item)}
                timeOn={item[0]}
                timeOff={item[1]}
                onDeleteTimer={deleteTimer}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lamp;
