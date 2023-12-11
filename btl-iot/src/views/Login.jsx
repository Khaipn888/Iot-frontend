import React, { useState } from "react";
import "../assets/styles/login.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { apiLogin } from "../apis/user";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // handle open alert
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  ///
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendEmail = () => {
    handleClose();
  };

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const [checkValidate, setValidate] = useState({
    email: false,
    password: false,
  });
  const dataFormCopy = { ...dataForm };

  const handleOnChange = (e) => {
    dataFormCopy[e.target.name] = e.target.value;
    setDataForm(dataFormCopy);
  };

  const handleSubmit = (e) => {
    let problem = 0;
    e.preventDefault();
    if (dataForm.password.length < 6) {
      setValidate((prev) => ({ ...prev, password: true }));
      problem++;
    } else {
      setValidate((prev) => ({ ...prev, password: false }));
    }
    if (dataForm.email.indexOf("@") === -1) {
      setValidate((prev) => ({ ...prev, email: true }));
      problem++;
    } else {
      setValidate((prev) => ({ ...prev, email: false }));
    }
    if (!problem) {
      apiLogin(dataForm)
        .then(() => navigate("/"))
        .catch((err) => {
          console.log(err.response.data.reason);
          //alert "Email or password incorrect"
          setOpenAlert(true);
        });
    }
  };

  return (
    <>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Email or password incorrect
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Get password by email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To get your password, please enter your email address here. We will
            send the password to your email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendEmail}>Ok</Button>
        </DialogActions>
      </Dialog>

      <div className="login-container d-flex flex-column justify-content-center">
        <div className="login-form p-5 pt-4 rounded-2 mx-auto bg-white">
          <form>
            <h1 className="text-center text-primary">Login</h1>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={handleOnChange}
                  name="email"
                />
                {checkValidate.email && (
                  <small className="text-danger">Email invalidate</small>
                )}
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={handleOnChange}
                  name="password"
                />
                {checkValidate.password && (
                  <small className="text-danger">
                    Password must contain at least 6 characters
                  </small>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <small className="">
                  No account? <Link to="/register">Register</Link>
                </small>
                <span className="">
                  <small className="forgot-password" onClick={handleClickOpen}>
                    Forgot password?
                  </small>
                </span>
              </div>
              <button
                className="btn btn-primary p-1 w-50 mx-auto"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
