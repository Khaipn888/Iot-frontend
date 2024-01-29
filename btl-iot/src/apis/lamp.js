import axiosConfig from "../utils/axiosConfig";
import setAuthHeader from "../utils/setAuthHeader";

  export const apiCreateLamp = (data) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api create lamp");
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/lamp/create", {
        roomId: data.roomId,
        name: data.name,
        lampOrder: data.lampOrder
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

  export const apiDeleteLamp = (lampId) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api delete lamp", lampId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/lamp/delete", {
        lampId: lampId,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

  export const apiChangeMode = (lampId, mode) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api change mode lamp", lampId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/lamp/change-mode", {
        lampId: lampId,
        mode: mode,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

  export const apiControlManual = (lampId, control) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api control manual lamp", lampId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/lamp/control-manual", {
        lampId: lampId,
        control: control,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

  export const apiChangeName = (lampId, name) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api change name lamp", lampId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/lamp/change-name", {
        lampId: lampId,
        name: name,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

  export const apiChangeBreakpoint = (lampId, breakpoint) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api change breakpoint lamp", lampId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/lamp/change-breakpoint", {
        lampId: lampId,
        breakpoint: breakpoint,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

  export const apiChangeTimer = (lampId, timers) =>
  new Promise( async (resolve, reject) => {
    try {
      console.log("api change timer lamp", lampId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/lamp/change-timers", {
        lampId: lampId,
        timers: timers,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });