import { createContext, useContext } from "react";
import { UserData } from "../hooks/useUser";

const UserContext = createContext<UserData>({
  setUsername: () => {},
});

export const UserContextProvider = UserContext.Provider;

export const useUserContext = () => useContext(UserContext);
