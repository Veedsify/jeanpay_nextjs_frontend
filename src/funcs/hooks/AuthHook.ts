import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser, verifyAccount } from "../auth/AuthFuncs";
import { CreateUserType, LoginUserType } from "@/types/user";

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

  return {
    createUser: createUserMutation,
    loginUser: loginUserMutation,
    verifyAccount: verifyAccountMutation,
  };
}
