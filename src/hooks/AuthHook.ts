import { useMutation } from "@tanstack/react-query";

import { CreateUserType, LoginUserType } from "@/types/user";
import {
  createUser,
  loginUser,
  verifyAccount,
  verifyToken,
} from "@/funcs/auth/AuthFuncs";

export default function useAuth() {
  const createUserMutation = useMutation({
    mutationFn: async (user: CreateUserType) => await createUser(user),
  });

  const loginUserMutation = useMutation({
    mutationFn: async (user: LoginUserType) => await loginUser(user),
  });

  const verifyAccountMutation = useMutation({
    mutationFn: async (email: string) => await verifyAccount(email),
  });

  const verifyTwofactorMutation = useMutation({
    mutationFn: async (code: string) => await verifyToken(code),
  });

  return {
    createUser: createUserMutation,
    loginUser: loginUserMutation,
    verifyAccount: verifyAccountMutation,
    twofactorAuth: verifyTwofactorMutation,
  };
}
