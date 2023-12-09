import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://binht1-iot-smarthome-be.onrender.com",
});
export default axiosConfig;
