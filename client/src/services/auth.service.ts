import API, { publicAPI } from "~/api/axios.config";
import { LoginInput, ResetPasswordInput, SignupInput } from "~/features/auth/auth-schema";

class AuthService {
  async login(data: LoginInput) {
    const res = await publicAPI.post("/auth/login", data);
    return res.data;
  }

  async googleLogin(code: string) {
    const { data } = await publicAPI.post("/auth/google", {
      code,
    });
    return data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  }

  async forgotPassword({ email }: { email: string }) {
    const res = await publicAPI.post("/auth/forgot-password", {
      email,
    });

    return res.data;
  }

  checkToken({ token, email }: { token: string; email: string }) {
    return API.post("auth/check-token", {
      token,
      email,
    });
  }

  async resetPassword(inputs: ResetPasswordInput) {
    const res = await publicAPI.post("auth/reset-password", inputs);

    return res.data;
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
