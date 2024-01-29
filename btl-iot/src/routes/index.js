import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage"
import Login from "../views/Login";
import Register from "../views/Register";
import RoomDetail from "../views/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/room/:roomId",
    element: <RoomDetail />,
  },
]);

export default router;
