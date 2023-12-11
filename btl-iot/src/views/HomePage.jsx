import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import LeftBar from "../components/LeftBar";

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

   useEffect(() => {
     if (!token) {
       navigate("/login");
     }
   }, [token, navigate]);
  return (
    <div>
      <LeftBar />
    </div>
  );
}

export default HomePage;
