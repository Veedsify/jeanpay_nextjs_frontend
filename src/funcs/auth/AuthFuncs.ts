import { axiosClient } from "@/lib/axios";
import { CreateUserType, LoginUserType } from "@/types/user";

async function createUser(user: CreateUserType) {
  return axiosClient.post("/auth/register", user);
}

async function loginUser(user: LoginUserType) {
  return axiosClient.post("/auth/login", user);
}

async function verifyAccount(email: string) {
  return axiosClient.post("/auth/verify", { email });
}

async function verifyToken(code: string) {
  return axiosClient.post("/auth/verify-otp", { code });
}

async function logoutUser() {
  return axiosClient.post("/auth/logout", {});
}

async function sendResetEmail(email: string) {
  const response = await axiosClient.post("/auth/password-reset-email", { email })
  return response.data
}

async function validateResetToken(token: string) {
  const response = await axiosClient.get("/auth/reset-password-verify", { params: { token } })
  return response.data
}

async function resetPassword(token: string, password: string) {
  const response = await axiosClient.post("/auth/reset-password", { token, password })
  return response.data
}
export { createUser, loginUser, verifyAccount, verifyToken, logoutUser, sendResetEmail, validateResetToken, resetPassword };
