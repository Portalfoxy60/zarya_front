import { useContext } from "react";
import { AuthContext, IAuthContext } from "./AuthProvider";

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри <AuthProvider>');
  }
  return context;
};