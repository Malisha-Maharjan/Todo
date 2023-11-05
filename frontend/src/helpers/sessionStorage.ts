export const saveUsername = (username: string) =>
  sessionStorage.setItem("username", username);

export const getUsername = () => sessionStorage.getItem("username");

export const saveToken = (token: string) =>
  sessionStorage.setItem("token", token);

export const getToken = () => sessionStorage.getItem("token");
