import axios from "axios";

export const get = async (url) => {
  try {
    const response = await axios.get(`${url}`);
    if (url.includes("/csrf-token")) {
      // axios.defaults.headers.get = {
      //   "Cache-Control": "max-age=31536000",
      // };
      axios.defaults.headers.post["X-CSRF-Token"] = response.data.csrfToken;
    }
    return response;
  } catch (error) {
    return error;
  }
};

export const post = async (url, data) => {
  try {
    const response = await axios.post(`${url}`, {
      data,
    });
    return response;
  } catch (error) {
    return error;
  }
};
