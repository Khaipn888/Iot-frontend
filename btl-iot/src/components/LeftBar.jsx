import React, { useEffect } from "react";
import avt from "../assets/images/avatar-default.png";
import "../assets/styles/leftBar.css";
import { apiLouout } from "../apis/user";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
const LeftBar = () => {
  const user = useSelector(state => state.user.user)
  const navigate = useNavigate()
  const logOut = () => {
    apiLouout();
    navigate("/login");
  }
  const userName = localStorage.getItem('user name');
useEffect(() => {

})

  return (
    <div className="left-bar pt-2 pb-5 d-flex flex-column justify-content-between align-items-center position-fixed top-0 start-0 ">
      <div className="w-100 d-flex flex-column justify-content-between align-items-center">
        <div className="logo w-50 h-25 mx-auto mb-5 text-center">
          <ion-icon name="logo-electron" onClick={navigate("/")}></ion-icon>
        </div>
        <div className="user w-50 mt-2">
          <div className="avatar mx-auto rounded-circle  overflow-hidden">
            <img src={avt} className="w-100 object-fit-cover " />
          </div>
          <p className="text-center fw-bold ">{userName}</p>
        </div>
      </div>
      <div className="logout">
        <button className="btn btn-outline-danger fw-bold" onClick={logOut}>Log out</button>
      </div>
    </div>
  );
};

export default LeftBar;
