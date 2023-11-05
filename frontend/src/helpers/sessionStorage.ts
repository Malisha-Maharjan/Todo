export const saveUsername = (username: string) =>
  sessionStorage.setItem("username", username);

export const getUsername = () => sessionStorage.getItem("username");
