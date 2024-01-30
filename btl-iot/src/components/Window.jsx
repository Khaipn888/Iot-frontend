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
  apiChangeMode,
  apiControlManual,
  apiDeleteWindow,
  apiChangeBreakpoints,
  apiChangeTimer,
} from "../apis/window";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { deleteWindow } from "../redux/reducer/room";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import WTimer from "./WTimer";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import WAutoList from "./WAutoList";
import { apiChangeBreakpoint } from "../apis/lamp";

function valuetext(value) {
  return `${value}cd`;
}

const Window = ({
  name,
  mode,
  windowId,
  status,
  height,
  breakpoints,
  timers,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteWindow = () => {
    apiDeleteWindow(windowId)
      .then(() => dispatch(deleteWindow(windowId)))
      .catch((err) => console.log(err));
    handleClose();
  };
  // handle toggle
  const [alignment, setAlignment] = useState(mode);

  const handleChangeButtonToggle = (event) => {
    setAlignment(event.target.value);
    apiChangeMode(windowId, event.target.value);
  };

  // handle manual mode
  const marks = [
    {
      value: 0,
      label: "Mở",
    },
    {
      value: 0.25,
      label: "1/4",
    },
    {
      value: 0.5,
      label: "1/2",
    },
    {
      value: 0.75,
      label: "3/4",
    },
    {
      value: 1,
      label: "Đóng",
    },
  ];
  const [manualStatus, setManualStatus] = useState(status);
  const changeStatus = (event) => {
    setManualStatus(event.target.value);
    apiControlManual(windowId, event.target.value, height);
  };
  // handle timer mode
  const [time, setTime] = useState(dayjs("2022-04-17T15:30"));
  const [listTimers, setListTimers] = useState(timers);
  const [close, setClose] = useState("0");

  const saveTime = () => {
    const listTimersCpy = [...listTimers];
    listTimersCpy.push(time.format("HH:mm") + "-" + close);
    setListTimers(listTimersCpy);
    console.log(listTimersCpy);
    //api change timer
    apiChangeTimer(windowId, listTimersCpy);
  };

  const deleteTimer = (index) => {
    let listTimerCpy = [...listTimers];
    listTimerCpy = listTimerCpy.filter(
      (item) => listTimerCpy.indexOf(item) !== index
    );
    setListTimers(listTimerCpy);
    apiChangeTimer(windowId, listTimerCpy);
  };

  // handle auto mode
  const [light, setLight] = useState('0');

  const handleChangeLight = (event) => {
    setLight(event.target.value);
  };

  const [listBreakpoints, setListBreakpoints] = useState(breakpoints);
  const [closeBp, setCloseBp] = useState("0");

  const saveBreakpoints = () => {
    const listBreakpointsCpy = [...listBreakpoints];
    listBreakpointsCpy.push(light + "-" + closeBp);
    setListBreakpoints(listBreakpointsCpy);
    //api change timer
    apiChangeBreakpoints(windowId, listBreakpointsCpy, height);
  };

  const deleteBreakpoint = (index) => {
    let listBreakpointsCpy = [...listBreakpoints];
    listBreakpointsCpy = listBreakpointsCpy.filter(
      (item) => listBreakpointsCpy.indexOf(item) !== index
    );
    setListBreakpoints(listBreakpointsCpy);
    apiChangeBreakpoints(windowId, listBreakpointsCpy);
  };


  return (
    <div className="Window-container rounded-2 shadow-lg bg-white py-2 px-4 my-2 position-relative">
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
              <Button onClick={handleDeleteWindow}>Yes</Button>
              <Button onClick={handleClose} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </p>
      {alignment === "manual" && (
        <div className="auto-mode ">
          <Box>
            <Slider
              aria-label="Always visible"
              defaultValue={status}
              getAriaValueText={valuetext}
              step={0.25}
              marks={marks}
              valueLabelDisplay="off"
              max={1}
              min={0}
              onChange={changeStatus}
              color="error"
            />
          </Box>
          {manualStatus === 0 && (
            <p className="text-danger fw-bold">Rèm mở hoàn toàn</p>
          )}
          {manualStatus === 0.25 && (
            <p className="text-danger fw-bold">Rèm đóng 1/4</p>
          )}
          {manualStatus === 0.5 && (
            <p className="text-danger fw-bold">Rèm đóng 1/2</p>
          )}
          {manualStatus === 0.75 && (
            <p className="text-danger fw-bold">Rèm đóng 3/4</p>
          )}
          {manualStatus === 1 && (
            <p className="text-danger fw-bold">Rèm đóng hoàn toàn</p>
          )}
        </div>
      )}
      {alignment === "auto" && (
        <div>
          <p className="timer d-flex justify-content-between align-items-center ">
            <div>
              <FormControl sx={{ m: 1, minWidth: 200 }} size="small" error>
                <InputLabel id="demo-select-small-label">Cường độ sáng</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={light}
                  label="Cường độ sáng"
                  onChange={handleChangeLight}
                >
                  <MenuItem value={'0'}>0 cd</MenuItem>
                  <MenuItem value={'200'}>200 cd</MenuItem>
                  <MenuItem value={'400'}>400 cd</MenuItem>
                  <MenuItem value={'600'}>600 cd</MenuItem>
                  <MenuItem value={'800'}>800 cd</MenuItem>
                  <MenuItem value={'1000'}>1000 cd</MenuItem>
                  <MenuItem value={'1200'}>1200 cd</MenuItem>
                  <MenuItem value={'1400'}>1400 cd</MenuItem>
                  <MenuItem value={'1600'}>1600 cd</MenuItem>
                  <MenuItem value={'1800'}>1800 cd</MenuItem>
                  <MenuItem value={'2000'}>2000 cd</MenuItem>
                </Select>
              </FormControl>
            </div>
            <select
              name="close"
              id="close"
              className="border-0 py-2 fw-bold "
              onChange={(e) => setCloseBp(e.target.value)}
            >
              <option value="0">Mở hết</option>
              <option value="0.25">Mở 3/4</option>
              <option value="0.5">Mở 1/2</option>
              <option value="0.75">Mở 1/4</option>
              <option value="1">Đóng hết</option>
            </select>
            <button className="btn btn-outline-danger ms-2" onClick={saveBreakpoints}>
              Save
            </button>
          </p>
          <div className="timer-list pe-5">
            {listBreakpoints?.map((item) => (
              <WAutoList
                key={listBreakpoints.indexOf(item)}
                index={listBreakpoints.indexOf(item)}
                light={item.slice(0, item.indexOf('-'))}
                close={item.substring(item.indexOf('-') + 1)}
                onDeleteBreakpoints={deleteBreakpoint}
              />
            ))}
          </div>
        </div>
      )}
      {alignment === "timer" && (
        <div>
          <p className="timer d-flex justify-content-between align-items-center ">
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker", "TimePicker"]}>
                  <TimePicker
                    label="Time"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <select
              name="close"
              id="close"
              className="border-0 py-2 fw-bold "
              onChange={(e) => setClose(e.target.value)}
            >
              <option value="0">Mở hết</option>
              <option value="0.25">Mở 3/4</option>
              <option value="0.5">Mở 1/2</option>
              <option value="0.75">Mở 1/4</option>
              <option value="1">Đóng hết</option>
            </select>
            <button className="btn btn-outline-danger ms-2" onClick={saveTime}>
              Save
            </button>
          </p>
          <div className="timer-list pe-5">
            {listTimers?.map((item) => (
              <WTimer
                key={listTimers.indexOf(item)}
                index={listTimers.indexOf(item)}
                time={item.slice(0, 5)}
                close={item.substring(6)}
                onDeleteTimer={deleteTimer}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Window;
