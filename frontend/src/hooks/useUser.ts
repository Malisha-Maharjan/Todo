import { useState } from "react";

export type UserData = {
  username?: string | undefined;
  setUsername: (user: string | undefined) => void;
};

export const useUser = (): UserData => {
  const [username, setUsername] = useState<string | undefined>();
  return {
    username,
    setUsername,
  };
};
