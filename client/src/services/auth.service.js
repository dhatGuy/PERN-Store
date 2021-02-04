import API from "api/axios.config";

class AuthService {
  async login(email, password) {
    const response = await API
      .post("/auth/login", {
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

  forgotPassword(email){
    return API.post("/auth/forgot-password", {
      email
    })
  }

  register(username, email, password) {
    return API.post("/signup", {
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
