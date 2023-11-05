import { Dispatch, SetStateAction, createContext } from "react";
// const [add, setAdd] = useState(" ");
type addContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const myContext = createContext<addContext>({
  open: false,
  setOpen: () => {},
});
