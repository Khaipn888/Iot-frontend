import axiosConfig from "../utils/axiosConfig";
import setAuthHeader from "../utils/setAuthHeader";


export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig.post("/api/v1/user/sign-up", {
        fullname: payload.name,
        email: payload.email,
        password: payload.password,
      });
      
      resolve(response.data.result);
    } catch (error) {
      reject(error);
    }
  });

  export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig
      .post("/api/v1/user/sign-in", {
        email: payload.email,
        password: payload.password,
      });
      
      if (response.data.token !== null) {
        localStorage.setItem(
          "token",
          response.data.user.accessToken.toString()
        );
        setAuthHeader(axiosConfig);
      }
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

  export const apiGetUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve();
    } catch (error) {
      reject(error);
    }
  });


export const apiLouout = () => new Promise( async (resolve, reject) => {
  try {
    setAuthHeader(axiosConfig);
    const response = await axiosConfig
    .post("/api/v1/user/sign-out")
    localStorage.removeItem("token");
    resolve(response.data.result)
  } catch (error) {
    reject(error)
  }
})
// export const apiLogout = async () => {
//   await axiosConfig
//     .post("/api/v1/user/sign-out")
//     .then((response) => {
//       localStorage.removeItem("token");
//       console.log(response);
//     })
//     .catch((err) => console.log(err));
// };
