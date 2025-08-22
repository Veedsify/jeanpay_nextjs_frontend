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

export { createUser, loginUser, verifyAccount, verifyToken };
