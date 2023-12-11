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
      console.log(response.data.result);
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
      console.log(response);
      setAuthHeader(axiosConfig, response.data.user.accessToken);
      if (response.data.token !== null) {
        localStorage.setItem(
          "token",
          response.data.user.accessToken.toString()
        );
      }
      console.log(response.data.result);
      resolve(response.data.result);
    } catch (error) {
      reject(error);
    }
  });

// export const apiLogin = async (payload) => {
//   await axiosConfig
//     .post("/api/v1/user/sign-in", {
//       email: payload.email,
//       password: payload.password,
//     })
//     .then((response) => {
//       setAuthHeader(response.data.user.accessToken);
//       if (response.data.token !== null) {
//         localStorage.setItem(
//           "token",
//           JSON.stringify(response.data.user.accessToken)
//         );
//       }
//     })
//     .catch((err) => console.log(err));
// };

export const apiLouout = () => new Promise( async (resolve, reject) => {
  try {
    const token = localStorage.getItem("token");
    setAuthHeader(axiosConfig, token);
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
