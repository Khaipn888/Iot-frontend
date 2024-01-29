import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const WAutoList = ({ light, index, close, onDeleteBreakpoints }) => {
  const handleDeleteBreakpoint = () => {
    onDeleteBreakpoints(index);
  };
  return (
    <div className="shadow d-flex justify-content-between align-items-center me-4 ps-3 my-1">
      <span className="fw-bold">
        <span>Cường độ {light} cd </span> 
        <span> -- </span> 
        <span>{close === '0' && (
            <span className="text-danger fw-bold">Rèm mở hoàn toàn</span>
          )}
          {close === '0.25' && (
            <span className="text-danger fw-bold">Rèm đóng 1/4</span>
          )}
          {close === '0.5' && (
            <span className="text-danger fw-bold">Rèm đóng 1/2</span>
          )}
          {close === '0.75' && (
            <span className="text-danger fw-bold">Rèm đóng 3/4</span>
          )}
          {close === '1' && (
            <span className="text-danger fw-bold">Rèm đóng hoàn toàn</span>
          )}</span>
      </span>
      <span>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={handleDeleteBreakpoint}
        >
          <DeleteIcon />
        </IconButton>
      </span>
    </div>
  );
};

export default WAutoList;
