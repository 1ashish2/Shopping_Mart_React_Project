import { post } from "../apis/axios-request";

export const loginUserService = (credentials) => {
  return post("login", JSON.stringify(credentials)).then(function (response) {
    console.log("res", response);
    if (
      response.data &&
      response.data.response &&
      (response.status === 200 || response.status === 202)
    ) {
      window.location.href = "/";
      return response.data.response;
    }
    //   return data.token;
    else throw response.data.response;
    // return data;
  });
};

export const logoutUserService = () => {
  return post("logout").then(function (response) {
    console.log("res", response);
    if (
      response.data &&
      response.data.response &&
      (response.status === 200 || response.status === 202)
    ) {
      // window.location.href = "/product";
      return response.data.response;
    }
    //   return data.token;
    else throw response.data.response;
    // return data;
  });
};
