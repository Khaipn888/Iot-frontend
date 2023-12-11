const setAuthHeader = (axios, token) => {
  if (token) {
    axios.defaults.headers = {
      Authorization: "Bearer " + token,
    };
  } else {
    delete axios.default.headers.Authorization;
  }
};

export default setAuthHeader;