import axios from "axios";
// export const urlEndPoint = 'https://radiology.org.in';
export const urlEndPoint = 'http://128.199.21.196:8080';
export function getaxiosInstance() {
  var axiosInstance;
  var mainUrl = urlEndPoint;
  if (localStorage.getItem("user") && localStorage.getItem("user") !== undefined) {

    axiosInstance = axios.create({
      baseURL: mainUrl,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
  }
  else {
    axiosInstance = axios.create({
      baseURL: mainUrl,

      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  axiosInstance.interceptors.response.use(
    function (response) {
      // some unnecessary defensive programming
      if (response !== undefined) {
        if (response.data) return response.data;
        return response;
      } else return {};
    },
    function (error) {
      console.log(error.data);
      return Promise.reject(error.response);
    }
  );

  return axiosInstance;
}
