import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Timer = ({ timeOn, timeOff, index, onDeleteTimer }) => {
  const handleDeleteTimer = () => {
    onDeleteTimer(index);
  };
  return (
    <div className="shadow d-flex justify-content-between align-items-center me-4 ps-3 my-1">
      <span className="fw-bold">
        <span>{timeOn}</span>
        <span> -- </span> 
        <span>{timeOff}</span>
      </span>
      <span>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={handleDeleteTimer}
        >
          <DeleteIcon />
        </IconButton>
      </span>
    </div>
  );
};

export default Timer;
