import axios from "axios";

const API_URL = "https://nameless-journey-88760.herokuapp.com/api/auth/";

class AuthService {
  async login(email, password) {
    const response = await axios
      .post(API_URL + "login", {
        email,
        password
      });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
