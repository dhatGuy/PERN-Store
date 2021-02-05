import API from "api/axios.config";

class AuthService {
  async login(email, password) {
    const response = await API.post("/auth/login", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  forgotPassword(email) {
    return API.post("/auth/forgot-password", {
      email,
    });
  }

  checkToken(token, email) {
    return API.post("auth/check-token", {
      token,
      email,
    });
  }

  resetPassword(token, email, password, password2) {
    return API.post("auth/reset-password", {
      token,
      email,
      password,
      password2,
    });
  }

  register(username, email, password) {
    return API.post("/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
