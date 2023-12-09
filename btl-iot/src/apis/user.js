import axiosConfig from "../utils/axiosConfig";
import setAuthHeader from "../utils/setAuthHeader";


export const apiRegister = async (payload) => {
  await axiosConfig
    .post("/api/v1/user/sign-up", {
      fullname: payload.name,
      email: payload.email,
      password: payload.password,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
};

export const apiLogin = async (payload) => {
  await axiosConfig
    .post("/api/v1/user/sign-in", {
      email: payload.email,
      password: payload.password,
    })
    .then((response) => {
      setAuthHeader(response.data.user.accessToken);
      if (response.data.token !== null){
        localStorage.setItem("token", JSON.stringify(response.data.user.accessToken));
      }
        
    })
    .catch((err) => console.log(err));
};
export const apiLogout = async () => {
  await axiosConfig
    .post("/api/v1/user/sign-out")
    .then((response) => {
      localStorage.removeItem("token");
      console.log(response);
    })
    .catch((err) => console.log(err));
};
