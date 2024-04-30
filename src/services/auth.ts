import { createApiClient } from "../utils/api";

export const AuthService = {
  loginBuyer: (payload: any) => createApiClient(false).post("/auth/login/user", payload),
  loginSeller: (payload: any) => createApiClient(false).post("/auth/login/farmer", payload),
  loginAdmin: (payload: any) => createApiClient(false).post("/auth/login/admin", payload),
  registerSeller: (payload: any) => createApiClient(false).post("/auth/register/farmer", payload),
  registerBuyer: (payload: any) => createApiClient(false).post("/auth/register/user", payload),


};
