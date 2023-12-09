import { createBrowserRouter } from "react-router-dom";
import HomePage from "../views/HomePage"
import Login from "../views/Login";
import Register from "../views/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },{
    path: "/register",
    element: <Register />,
  },
]);

export default router;
