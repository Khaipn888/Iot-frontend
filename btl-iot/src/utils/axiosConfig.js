import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8000",
});
export default axiosConfig;
