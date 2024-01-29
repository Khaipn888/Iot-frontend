import axiosConfig from "../utils/axiosConfig";
import setAuthHeader from "../utils/setAuthHeader";

export const apiCreateWindow = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("api create Window");
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/window/create", {
        roomId: data.roomId,
        name: data.name,
        windowOrder: data.windowOrder,
        height: data.height,
      });

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteWindow = (windowId) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("api delete Window", windowId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/window/delete", {
        windowId: windowId,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangeMode = (windowId, mode) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("api change mode window", windowId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/window/change-mode", {
        windowId: windowId,
        mode: mode,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const apiControlManual = (windowId, status) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("api control manual window", windowId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/window/control-manual", {
        windowId: windowId,
        status: status,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangeName = (windowId, name) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("api change name window", windowId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/window/change-name", {
        windowId: windowId,
        name: name,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangeTimer = (windowId, timers) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("api change timers window", windowId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/window/change-timer", {
        windowId: windowId,
        timers: timers,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangeBreakpoints = (windowId, breakpoints) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("api change breakpoints window", windowId);
      setAuthHeader(axiosConfig);
      const response = await axiosConfig.post("/api/v1/window/change-breakpoint", {
        windowId: windowId,
        breakpoints: breakpoints,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
