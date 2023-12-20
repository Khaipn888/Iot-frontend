import axiosConfig from "../utils/axiosConfig";
import setAuthHeader from "../utils/setAuthHeader";

export const apiGetAllRoom = async () => {
  setAuthHeader(axiosConfig);
  const response = await axiosConfig.get("/api/v1/room/get-all");
  return response.data;
};

export const apiGetDetail = (roomId) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api getdetail rooms");
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/room/detail", {
        roomId: roomId,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
  export const apiCreateRoom = (data) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api create rooms");
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/room/create", {
        roomId: data.roomId,
        name: data.name,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
