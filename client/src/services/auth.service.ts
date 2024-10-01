import API, { publicAPI } from "~/api/axios.config";
import { LoginInput, SignupInput } from "~/features/auth/auth-schema";

class AuthService {
  async login(data: LoginInput) {
    const res = await publicAPI.post("/auth/login", data);
    return res.data;
  }

  async googleLogin(code) {
    const { data } = await API.post("/auth/google", {
      code,
    });
    return data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
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

  signup = async (data: SignupInput) => {
    const res = await publicAPI.post("/auth/signup", data);

    return res.data;
  };

  async getCurrentUser() {
    const res = await API.get("/auth/me");

    return res.data.data;
  }
}

export default new AuthService();
