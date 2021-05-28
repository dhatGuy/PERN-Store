import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "/api";

const API = axios.create({
  baseURL
});

API.interceptors.request.use(
  function (req) {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) req.headers["auth-token"] = token;
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API.interceptors.response.use(
//   (response) => response,
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && originalRequest.url === "/auth/refresh-token") {
//       return new Promise((resolve, reject) => {
//         console.log(error.response)
//         history.push("/login");
//         reject(error);
//       });
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       try {
//         originalRequest._retry = true;
//         const res = await API.post("/auth/refresh-token")
//         localStorage.setItem("token", JSON.stringify(res.data.token));
//         return API(originalRequest);
//       } catch (error) {
//         console.log(error.response)
//         localStorage.removeItem("token");
//         history.push("/login")
//       }
//     }
//     return Promise.reject(error);
//   }
// );
export default API;
