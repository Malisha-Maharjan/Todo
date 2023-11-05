export const useSession = (key: string) => {
  const setSession = (value: string) => sessionStorage.setItem(key, value);

  const getSession = () => sessionStorage.getItem(key);

  return { setSession, getSession };
};
