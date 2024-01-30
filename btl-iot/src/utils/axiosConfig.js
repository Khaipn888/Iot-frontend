import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://localhost:8000",
});
export default axiosConfig;
